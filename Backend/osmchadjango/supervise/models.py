import uuid

from django.contrib.gis.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.gis.geos import GEOSGeometry
from django.http.request import HttpRequest

from osmchadjango.changeset.filters import ChangesetFilter
from osmchadjango.feature.filters import FeatureFilter
from osmchadjango.changeset.models import Changeset

from ..users.models import User

import requests
import json
from osm2geojson import json2geojson, shape_to_feature
from shapely.ops import unary_union
from shapely.geometry import shape


class AreaOfInterest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    filters = JSONField()
    geometry = models.GeometryField(blank=True, null=True)
    objectTagArea = models.GeometryField(blank=True, null=True)
    filterStatus = JSONField(blank=True, null=True)

    def __str__(self):
        return '{} by {}'.format(self.name, self.user.username)

    def changesets(self, request=None):
        """Return the changesets that match the filters, including the geometry
        of the AreaOfInterest. Fake a request object in order to execute the
        query with the user that created the AoI, not with the request user.
        """
        request = HttpRequest
        request.user = self.user

        self.deleteKeysWithEmptyValues()

        if self.filterStatus is None:
            self.filterStatus = {}

        qs = ChangesetFilter(self.filters, request=request).qs

        if 'objectTags' in self.filters and 'filterArea' in self.filters:
            newObjectTagAreaGeoJSON = self.getGeojsonFromOverpass()
            if newObjectTagAreaGeoJSON is not None:
                self.setObjectTagArea(newObjectTagAreaGeoJSON)

                qs = qs.filter(
                    bbox__intersects=self.objectTagArea
                )

                merged_areas = self.getMergedAreas(newObjectTagAreaGeoJSON, False)

                self.objectTagArea = GEOSGeometry(str(merged_areas['geometry']))
                self.save()
            else:
                self.filterStatus['newChangesets'] = []
                self.save()
                return Changeset.objects.none()

        if self.geometry is not None:
            qs = qs.filter(
                bbox__intersects=self.geometry
            )

        if len(Changeset.objects.all()) == qs.count():  # This assumes that not all Changesets match the filter
            self.filterStatus['newChangesets'] = []
            self.save()
            return Changeset.objects.none()

        if 'finished' in self.filterStatus:
            changesetIDs = self.filterStatus['finished']
            qs = qs.exclude(id__in=changesetIDs)

        self.filterStatus['newChangesets'] = []
        for changeset in qs:
            if str(changeset) not in self.filterStatus.get('inProgress', []):
                self.filterStatus['newChangesets'].append(str(changeset))

        self.save()

        return qs

    def deleteKeysWithEmptyValues(self):
        if 'objectTags' in self.filters and str(self.filters['objectTags']) == '':
            self.filters.pop('objectTags', None)
        if 'usersToTrack' in self.filters and str(self.filters['usersToTrack']) == '':
            self.filters.pop('usersToTrack', None)
        if 'filterMember' in self.filters and str(self.filters['filterMember']) == '':
            self.filters.pop('filterMember', None)
        if 'filterArea' in self.filters and str(self.filters['filterArea']) == '':
            self.filters.pop('filterArea', None)
        if 'buffer' in self.filters and str(self.filters['buffer']) == '':
            self.filters.pop('buffer', None)
        self.save()

    def setObjectTagArea(self, newObjectTagAreaGeoJSON):
        if self.objectTagArea is not None:
            merged_areas = self.getMergedAreas(newObjectTagAreaGeoJSON, True)
        else:
            merged_areas = self.getMergedAreas(newObjectTagAreaGeoJSON, False)

        self.objectTagArea = GEOSGeometry(str(merged_areas['geometry']))

    def getBuffer(self):
        buffer = float(self.filters.get('buffer', 0))
        if buffer is None or buffer == 0 or buffer < 0.1:
            buffer = 1
        return buffer / 100000

    def getMergedAreas(self, newObjectTagAreaGeoJSON, isWithOldGeoJson):
        polygons = []
        if isWithOldGeoJson:
            oldgeojson = json.loads(self.objectTagArea.json)
            polygons.append(shape(oldgeojson))
        for poly in newObjectTagAreaGeoJSON['features']:
            polygons.append(shape(poly['geometry']).buffer(self.getBuffer()))
        merged_areas = shape_to_feature(unary_union(polygons))
        return merged_areas

    def getGeojsonFromOverpass(self):
        tagValue = self.filters['objectTags']
        tagValues = [
            [i.strip() for i in t.split('=')]  # remove leading and ending spaces
            for t in tagValue.split(',')
            if len(t.split('=')) == 2
        ]

        areaQuery = ''
        overPassTagQuery = ''

        areas = self.filters['filterArea']
        splittedAreas = areas.split(',')
        for area in splittedAreas:
            area = area.strip()
            searchArea = area.replace('ü', 'u').replace('ä', 'a').replace('ö', 'o')
            areaQuery += 'area[name="{areaName}"]->.search{searchArea};\n'.format(areaName=area, searchArea=searchArea)
            for tag in tagValues:
                overPassTagQuery += 'nwr["{key}"="{value}"](area.search{searchArea});\n'.format(key=tag[0],
                                                                                                value=tag[1],
                                                                                                areaName=area,
                                                                                                searchArea=searchArea)

        overpass_url = "http://overpass-api.de/api/interpreter"
        overpass_query = '[out:json];\n{0}(\n{1}\n);\nout body;\n>;\nout skel qt;'.format(areaQuery, overPassTagQuery)
        response = requests.get(overpass_url, params={'data': overpass_query})
        if response.status_code != 200 or not response.json()['elements']:
            return None;
        newObjectTagArea = response.json()
        return json2geojson(newObjectTagArea)

    def features(self):
        """Return the features that match the filters, including the geometry
        of the AreaOfInterest.
        """
        qs = FeatureFilter(self.filters).qs
        if self.geometry is not None:
            return qs.filter(
                geometry__intersects=self.geometry
            )
        else:
            return qs

    class Meta:
        unique_together = ('user', 'name',)
        ordering = ['-date']
        verbose_name = 'Area of Interest'
        verbose_name_plural = 'Areas of Interest'


class BlacklistedUser(models.Model):
    username = models.CharField(max_length=1000)
    uid = models.CharField(max_length=255)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.uid

    def save(self, *args, **kwargs):
        self.full_clean()
        super(BlacklistedUser, self).save(*args, **kwargs)

    class Meta:
        unique_together = ('uid', 'added_by')
        ordering = ['-date']
