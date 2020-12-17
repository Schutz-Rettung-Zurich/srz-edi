const changesets = [{
    "id": 93002920,
    "type": "Feature",
    "geometry": {
        "coordinates": [[
            [9.4365455, 47.5155412],
            [9.4372953, 47.5155412],
            [9.4372953, 47.5160211],
            [9.4365455, 47.5160211],
            [9.4365455, 47.5155412]]],
        "type": "Polygon"
    },
    "properties": {
        "check_user": null,
        "reasons": [],
        "tags": [],
        "features": [],
        "user": "Geonick",
        "uid": "6087",
        "editor": "iD 2.18.5",
        "comment": "Schlösser und Burgen der Schweiz",
        "comments_count": 0,
        "source": "Not reported",
        "imagery_used": "kt_tg_ortho_2017",
        "date": "2020-10-24T23:59:44Z",
        "create": 1,
        "modify": 0,
        "delete": 0,
        "area": 3.59829020002079e-07,
        "is_suspect": false,
        "harmful": null,
        "checked": false,
        "check_date": null,
        "metadata": {
            "changesets_count": 4525,
            "hashtags": "#CastleProject",
            "locale": "en",
            "host": "https://www.openstreetmap.org/edit"
        }
    }
},
    {
        "id": 93002356,
        "type": "Feature",
        "geometry": {
            "coordinates": [[
                [9.4095042, 47.3298464],
                [9.4097671, 47.3298464],
                [9.4097671, 47.3300014],
                [9.4095042, 47.3300014],
                [9.4095042, 47.3298464]]],
            "type": "Polygon"
        },
        "properties": {
            "check_user": null,
            "reasons": [],
            "tags": [],
            "features": [],
            "user": "Geonick",
            "uid": "6087",
            "editor": "iD 2.18.5",
            "comment": "Schlösser und Burgen der Schweiz",
            "comments_count": 0,
            "source": "Not reported",
            "imagery_used": "EsriWorldImageryClarity",
            "date": "2020-10-24T23:10:14Z",
            "create": 0,
            "modify": 1,
            "delete": 0,
            "area": 4.07494999997309e-08,
            "is_suspect": false,
            "harmful": null,
            "checked": false,
            "check_date": null,
            "metadata": {
                "changesets_count": 4524,
                "hashtags": "#CastleProject",
                "locale": "en",
                "host": "https://www.openstreetmap.org/edit"
            }
        }
    },
    {
        "id": 92999019,
        "type": "Feature",
        "geometry": {
            "coordinates": [[
                [8.8654687, 47.2850392],
                [8.8655022, 47.2850392],
                [8.8655022, 47.2850902],
                [8.8654687, 47.2850902],
                [8.8654687, 47.2850392]]],
            "type": "Polygon"
        },
        "properties": {
            "check_user": null,
            "reasons": [],
            "tags": [],
            "features": [],
            "user": "Geonick",
            "uid": "6087",
            "editor": "iD 2.18.5",
            "comment": "Schlösser und Burgen der Schweiz",
            "comments_count": 0,
            "source": "Not reported",
            "imagery_used": "OGDOrthoZH2018",
            "date": "2020-10-24T20:15:38Z",
            "create": 0,
            "modify": 1,
            "delete": 1,
            "area": 1.708500000006e-09,
            "is_suspect": false,
            "harmful": null,
            "checked": false,
            "check_date": null,
            "metadata": {
                "changesets_count": 4523,
                "hashtags": "#CastleProject",
                "locale": "en",
                "host": "https://www.openstreetmap.org/edit"
            }
        }
    }];

const token = "Test";
const oauthSecret = "Secret";
const oauthToken = "";

const filters = [
    {
        "id": "ac65cb3c-e13a-4f64-9f34-d5ccd4a89efb",
        "type": "Feature",
        "geometry": null,
        "properties": {
            "name": "Fetch Test",
            "filters": {
                "usersToTrack": "nadine98",
                "filterArea": "Schaffhausen,Zug,Zürich,Schwyz",
                "filterMember": "ufvgbhnjmk,l.ö-ä£,123",
                "buffer": "69",
                "objectTags": "wdesd=fgasf"
            },
            "date": "2020-12-06T13:53:19.709342Z",
            "changesets_url": "/api/v1/aoi/ac65cb3c-e13a-4f64-9f34-d5ccd4a89efb/changesets/"
        }
    },
    {
        "id": "da026f21-cace-448a-bf52-589e7b5f38de",
        "type": "Feature",
        "geometry": null,
        "properties": {
            "name": "Test Filter",
            "filters": {
                "filterMember": "nadine98",
                "buffer": 0,
                "usersToTrack": "chnuessli"
            },
            "date": "2020-12-05T20:28:23.612600Z",
            "changesets_url": "/api/v1/aoi/da026f21-cace-448a-bf52-589e7b5f38de/changesets/"
        }
    },
    {
        "id": "5cfa9956-f3b3-44e0-b887-27ca5fb8fc30",
        "type": "Feature",
        "geometry": null,
        "properties": {
            "name": "Teest2",
            "filters": {
                "usersToTrack": "Nauden",
                "filterArea": "",
                "filterMember": "",
                "buffer": 0,
                "objectTags": ""
            },
            "date": "2020-12-04T20:46:54.203473Z",
            "changesets_url": "/api/v1/aoi/5cfa9956-f3b3-44e0-b887-27ca5fb8fc30/changesets/"
        }
    },
    {
        "id": "5bc5e3f5-b44d-4c82-8b11-d11b2209f5ab",
        "type": "Feature",
        "geometry": null,
        "properties": {
            "name": "Test",
            "filters": {
                "buffer": 0,
                "usersToTrack": "chnuessli"
            },
            "date": "2020-12-04T19:48:23.129861Z",
            "changesets_url": "/api/v1/aoi/5bc5e3f5-b44d-4c82-8b11-d11b2209f5ab/changesets/"
        }
    },
    {
        "id": "cb193079-857b-42b6-aea1-b0f1f599a131",
        "type": "Feature",
        "geometry": null,
        "properties": {
            "name": "Rettungswachen",
            "filters": {
                "filterArea": "Zürich,Zug",
                "filterMember": "Nauden",
                "buffer": 0,
                "objectTags": "emergency=ambulance_station"
            },
            "date": "2020-12-04T16:47:43.146133Z",
            "changesets_url": "/api/v1/aoi/cb193079-857b-42b6-aea1-b0f1f599a131/changesets/"
        }
    }
];

export function getToken() {
    return (dispatch) => {
        dispatch({type: "FETCH_TOKEN_SUCCEEDED", token})
    }
}

export function fetchMyFilters() {
    return (dispatch) => {
        dispatch({type: "FETCH_MYFILTERS_SUCCEEDED", filters});
    }
}

export function fetchMyFiltersError() {
    const error = "newFail";
    return (dispatch) => {
        dispatch({type: "FETCH_MYFILTERS_FAILED", error});
    }
}

export function fetchrealesedFilters() {
    return (dispatch) => {
        dispatch({type: "FETCH_RELEASEDFILTERS_SUCCEEDED", filters});
    }
}

export function fetchMyFiltersNull() {
    const filters = [];
    return (dispatch) => {
        dispatch({type: "FETCH_MYFILTERS_SUCCEEDED", filters});
    }
}

export function fetchrealesedFiltersNull() {
    const filters = [];
    return (dispatch) => {
        dispatch({type: "FETCH_RELEASEDFILTERS_SUCCEEDED", filters});
    }
}

export function loadChangesetsSucceeded() {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETS_SUCCEEDED", changesets})
    };
}

export function loadChangesetsFailed() {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESET_FAILED"});
    };
}

const changeset1 = changesets[1];
const changeset2 = changesets[2];

export function fetchActualChangeset1() {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESET_SUCCEEDED", changeset1});
    }
}

export function fetchActualChangeset2() {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESET_SUCCEEDED", changeset2});
    }
}

export function getChangesetStatus() {
    const state = {
        newChangesets: [93002920],
        editChangesets: [93002921, 93002356, 92999019],
        doneChangesets: [93002923]
    };
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETSTATE_SUCCEEDED", state});
    }
}

export function actualfilter(isRealesed) {
    return (dispatch) => {
        dispatch({type: "FETCH_SETFILTER_STARTED"});
        const value = {filter: filters[1], isRealesed: isRealesed};
        dispatch({type: "FETCH_SETFILTER_SUCCEEDED", value});
    }
}

export function sort(type) {
    return (dispatch) => {
        const data = {value: type};
        dispatch({type: "FETCH_SETSORT_SUCCEEDED", data});
    }
}

export function fetchMyProfile() {
    return (dispatch) => {
        dispatch({type: "FETCH_PROFILE_STARTED"});
        const profile = {id: 12, username: "Test"};
        dispatch({type: "FETCH_PROFILE_SUCCEEDED", profile});
    };
}
