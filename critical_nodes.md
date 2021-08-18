# Critical Nodes / kritische Datensätze

Datensätze, die für die Einsatzleitzentrale von Schutz & Rettung (ELZ) von Wichtigkeit sind werden in dieser Datei als "critical nodes" definiert und in eine Tabelle gepappt.

## Dispogebiet SRZ

Zum Dispogebiet von SRZ gehören folgende Kantone inkl. Notrufnummer der Zuständigkeit:

* Zürich (144/118)
* Schwyz (144)
* Zug (144)
* Schaffhausen (144)

----------

## Tabelle mit den Nodes

| Node      | Tag | Beschreibung | Wiki Link
| ----------- | ----------- | ----------- | ----------- |
|amenity | hospital | Spitäler | [hospital](https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dhospital)
|amenity | nursing_home | Altersheime, Behindertenheime, Heime| [nursing_home](https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dnursing_home)
|amenity | social_facility | Sozialeinrichtungen | [social_facility](https://wiki.openstreetmap.org/wikiDE:Tag:amenity%3Dnursing_home)
|railway | station | Bahnhöfe | [railway_station](https://wiki.openstreetmap.org/wiki/DE:Tag:railway%3Dstation)
|railway | tram | Tramstationen | [tram_station](https://wiki.openstreetmap.org/wiki/Trams)
|amenity | fire_station | Feuerwachen | [fire_station](https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dfire_station)
|emergency | ambulance_station |Rettungswachen | [ambulance_station](https://wiki.openstreetmap.org/wiki/DE:Tag:emergency%3Dambulance_station)
|amenity | police | Polizeiwachen| [police](https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dpolice)
|aeroway | helipad | Helipads | [helipad](https://wiki.openstreetmap.org/wiki/DE:Tag:aeroway%3Dhelipad)
|highway | motorway | Autobahn | [motorway](https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dmotorway)
|highway | trunk | Autostrasse | [trunk](https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dtrunk)

----------

## Beschreibung der Nodes und Erklärung

Um einen Einblick zu geben, warum diese Daten so kritisch sind wurden die untenstehenden Abschnitte gebildet.
Der Leser soll nach Durchlesen erkennen, dass diese Daten direkt aus OSM kommen sollen um den Mehrwert zu erkennen.

### Spitäler

Wir beziehen die Spitäler direkt aus OSM und pflegen dann die Abteilungen direkt in unserem System nach.
Die Spitäler müssen zwingend in OSM überwacht werden, da diese nicht verloren gehen dürfen.

### Altersheime, Behindertenheime,Heime

Sehr viele Einsätze finden in Altersheimen statt.
Sofern diese durch uns oder die Community gepflegt wurden sollten wir diese auch überwachen.

### Sozialeinrichtungen

Analog zu den Altersheimen tracken wir auch Sozialeinrichtungen wie Asylunterkünfte usw.

### Bahnhöfe

Bahnhöfe bieten auch immer wieder Anlass zu einem Einsatz.
Die Bahnhöfe sind schweizweit sehr gut gepflegt, wichtig ist für uns vorallem die Gleise, und die Zufahrten,

### Tramstationen

Analog zu den Bahnhöfen tracken wir auch die Tramstationen in der Stadt Zürich

### Feuerwachen

Wir haben alle Feuerwachen des Kanton Zürich in OSM gepflegt.
Diese Wachen sollen überwacht werden weil wir Änderungen mitbekommen möchten.

### Rettungswachen

Wir haben alle Rettungswachen unseres Dispogebietes in OSM gepflegt.
Diese Wachen sollen überwacht werden weil wir Änderungen mitbekommen möchten.

### Polizeiwachen

Wir haben alle Polizeiwachen unseres Dispogebietes in OSM gepflegt.
Diese Wachen sollen überwacht werden weil wir Änderungen mitbekommen möchten.

### Helipads

Helipads auf Spitälern oder in Kliniken sind für unsere Luftrettung essentiell, deswegen haben wir diese auch in OSM gepflegt und würden diese gerne überwachen.

### Autobahnen / Autostrassen

Umbenennungen von Autobahnen haben direkten Einfluss auf unser EInsatzgeschehen, deswegen werden diese auch überwacht.

### spezielles Tagging

Unser spezielles Tagging wie in [SRZ Wiki](https://wiki.openstreetmap.org/wiki/Organised_Editing/Activities/SchutzRettung_Rescue) beschrieben.
Das Tag gilt gezielt auf gewisse Einsatznodes, die aber nur das eine spezielle Objekt überwachen sollen, und nicht alle Nodes dieser Klasse.

### Changeset Tag

Wir versuchen, jedes Changeset welches wir beruflich gemacht haben, mit einem Changeset Tag zu versehen.
Das Changeset lautet wie folgt `#srz`
