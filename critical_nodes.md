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
| amenity      | nursing_home       | Altersheime, Behindertenheime, Heime| [nursing_home](https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dnursing_home)
| amenity   | hospital        | Spitäler | [hospital](https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dhospital)
| barrier   | gate        | Flughafentore | [barrier_gate](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier%3Dgate)
| emergency   | defibrillator        | Defibrillatoren | [defibrillator](https://wiki.openstreetmap.org/wiki/DE:Tag:emergency%3Ddefibrillator)
| railway   | station        | Bahnhöfe | [railway_station](https://wiki.openstreetmap.org/wiki/DE:Tag:railway%3Dstation)
| leisure   | stadium        | Events / Stadien | [stadium](https://wiki.openstreetmap.org/wiki/Tag:leisure%3Dstadium)
| amenity   | fire_station        | Feuerwachen | [fire_station](https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dfire_station)
| emergency   | ambulance_station        | Rettungswachen | [ambulance_station](https://wiki.openstreetmap.org/wiki/DE:Tag:emergency%3Dambulance_station)
| aeroway   | helipad        | Helipads | [helipad](https://wiki.openstreetmap.org/wiki/DE:Tag:aeroway%3Dhelipad)
| note   | Für Schutz & Rettung u.a einsatzrelevant.        | für Schutz und Rettung einsatzrelevant | [SRZ Note](https://wiki.openstreetmap.org/wiki/Organised_Editing/Activities/SchutzRettung_Rescue#Eindeutige_Erkennbarkeit)

----------

## Beschreibung der Nodes und Erklärung

Um einen Einblick zu geben, warum diese Daten so kritisch sind wurden die untenstehenden Abschnitte gebildet.
Der Leser soll nach Durchlesen erkennen, dass diese Daten direkt aus OSM kommen sollen um den Mehrwert zu erkennen.

### Altersheime, Behindertenheime,Heime

Sehr viele Einsätze finden in Altersheimen statt.
Sofern diese durch uns oder die Community gepflegt wurden sollten wir diese auch überwachen.

### Spitäler

Wir beziehen die Spitäler direkt aus OSM und pflegen dann die Abteilungen direkt in unserem System nach.
Die Spitäler müssen zwingend in OSM überwacht werden, da diese nicht verloren gehen dürfen.

### Tore am Flughafen

Da wir für die Berechnung der nächsten Einheit auf Routing Daten von OSM setzen haben wir die Tore am Flughafen Zürich geschlossen.
Die Tore sind alle gemappt mit den untenstehenden Tags.
Die Tore die befahren werden dürfen, haben wir mit den emergency Tags gesteuert

    barrier=gate
    emergency=yes -> wenn befahrbar durch Rettungsorganisation
    emergency=no -> Tor geschlossen für _ALLE_

### Defibrillatoren

Durch ein privates Projekt wurden extrem viele Defibrillatoren gepflegt welche nun auf der ELZ in einem Kartenlayer für das Dispogebiet SRZ angezeigt werden.
Wenn sich an diesen Nodes etwas ändern sollte, würden wir dies gerne erfahren.
In der Notrufabfrage sind diese Nodes teilweise auch sehr relevant.

### Bahnhöfe

Bahnhöfe bieten auch immer wieder Anlass zu einem Einsatz.
Die Bahnhöfe sind schweizweit sehr gut gepflegt, wichtig ist für uns vorallem die Gleise, und die Zufahrten,

### Eventlocations

Eventlocations wie z.B das Hallenstadion sind für die ELZ bei Veranstaltungen relevant.
Ganz spezielle Events wie z.B das Zürifest pflegen wir immer in eigenen Layern.

### Feuerwachen

Wir haben alle Feuerwachen des Kanton Zürich in OSM gepflegt.
Diese Wachen sollen überwacht werden weil wir Änderungen mitbekommen möchten.

### Rettungswachen

Wir haben alle Rettungswachen unseres Dispogebietes in OSM gepflegt.
Diese Wachen sollen überwacht werden weil wir Änderungen mitbekommen möchten.

### Helipads

Helipads auf Spitälern oder in Kliniken sind für unsere Luftrettung essentiell, deswegen haben wir diese auch in OSM gepflegt und würden diese gerne überwachen.

### Militäranlagen

Um unser Drohnenteam bei ihrer Arbeit zu unterstützen bieten wir Ihnen eine Überwachung von Militäranlagen im Dispogebiet an.
Militärische Gebiete sind automatisch Drohnensperrzonen, somit können Drohnenpiloten nur mit spezieller Lizenz dort fliegen.

### spezielles Tagging

Unser spezielles Tagging wie in [SRZ Wiki](https://wiki.openstreetmap.org/wiki/Organised_Editing/Activities/SchutzRettung_Rescue) beschrieben.
Das Tag gilt gezielt auf gewisse Einsatznodes, die aber nur das eine spezielle Objekt überwachen sollen, und nicht alle Nodes dieser Klasse.

### Changeset Tag

Wir versuchen, jedes Changeset welches wir beruflich gemacht haben, mit einem Changeset Tag zu versehen.
Das Changeset lautet wie folgt `#srz`
