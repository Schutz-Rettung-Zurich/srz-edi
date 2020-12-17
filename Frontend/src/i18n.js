import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    de: {
        translation: {
            "home": {
                "title": "Home",
                "myFilters": {
                    "title": "Meine Filter",
                    "help": "Dies sind die Filter, die Sie selber erstellt haben und bearbeiten können.",
                    "emptyList": "Sie haben noch keinen eigenen Filter angelegt",
                },
                "newFilter": "+",
                "releasedFilters": {
                    "title": "Für mich freigegebene Filter",
                    "help": "Dies sind Filter, bei denen Sie als Datenkurator hinzugefügt wurden, um die auffälligen Datensätze zu überprüfen.",
                    "emptyList": "Ihnen wurde noch kein Filter freigegeben",
                }
            },
            "srzHeader": {
                "logout": "{{userName}} Logout",
            },
            "login": {
                "login": "Login",
                "description": "Login über OpenStreetMap",
            },
            "listEntry": {
                "description": "Beschreibung: {{comment}}",
                "user": "Changeset von: {{user}}",
                "date": "Changeset vom: {{date}}",
                "state": "Aktueller Status: {{state}}",
                "changeState": "Status ändern",
                "weight": {
                    "high": "Hoch",
                    "middle": "Mittel",
                    "low": "Gering",
                },
                "optionsState": {
                    "new": "offen",
                    "edit": "in Bearbeitung",
                    "done": "abgeschlossen",
                },
            },
            "sort": {
                "new": "Neuste",
                "weight": "Gewichtung",
                "state": "Status",
            },
            "filter": {
                "titleView": "Filter {{name}} ansehen",
                "titleEdit": "Filter {{name}} bearbeiten",
                "titleNew": "Neuer Filter",
            },
            "overview": {
                "changesets": "Datensätze",
                "actualStateDescription": "Letzte Status-Aktualisierung",
                "actualState": "{{hours}}:{{minutes}}",
                "noChnagesets": "Es gibt zurzeit keine passenden Changesets",
                "viewFilter": "Filter ansehen",
                "editFilter": "Filter bearbeiten",
            },
            "newFilter": {
                "options": {
                    "zurich": "Zürich",
                    "zug": "Zug",
                    "schwyz": "Schwyz",
                    "schaffhausen": "Schaffhausen",
                },
                "actions": {
                    "negativeTagCheck": "Der Tag {{tag}} wurde nicht gefunden",
                    "tagCheckProblem": "Der Tagtest über tagfinder.herokuapp.com ist zurzeit nicht verfügbar.",
                    "saveFilter": "Der Filter {{name}} wird gespeichert.",
                    "saveFilterFail": "Der Filter konnte nicht gespeichert werden.",
                    "saveButton": "Speichern",
                    "backButton": "Zurück",
                    "deleteButton": "Löschen",
                },
                "name": {
                    "sectionHeader": "Filter-Bezeichnung",
                    "inputInformation": "<1/>Geben Sie einen Namen für den Filter ein. Der Name" +
                        " muss einzigartig sein.<1/>",
                    "input": "Name",
                    "inputHelperText": "Geben Sie einen Namen ein.",
                },
                "filter": {
                    "sectionHeader": "Filter-Möglichkeiten",
                    "inputInformation": "<1/>Hier können Sie entweder nach Tags oder einem Benutzer filtern.<1/>" +
                        "<2/>Für einen Filter nach Objekt-Tag müssen Sie die Felder Kanton und Tags ausfüllen und können zusätzlich " +
                        "einen Buffer angeben. Die Tags werden in der Form key=value angegeben. Es können mehrere " +
                        "Tags angegeben werden. Bei mehreren Tags wird eine Oder-Verknüpfung gemacht (Beispiel: " +
                        "amnety=hospital und amenity=fire_station -> Changesets die ein Spital oder eine Feuerstation" +
                        "überlagern, werden angezeigt.) Da die Tags mit Hilfe von Overpass in eine Referenzfläche umgewandelt " +
                        "werden, muss man die Region eingrenzen. Der Buffer ermöglicht es, auch Changesets zu erhalten, " +
                        "deren Ausdehnung in der Nähe der zu überwachenden Objekte fällt. (Beispiel: Spital wird " +
                        "beobachtet, aber Änderungen an der Zufahrt sollen auch bemerkt werden.)<2/><3/>Für einen " +
                        "Filter nach Benutzer muss nur der OSM-Benutzername eingegeben werden. Es werden " +
                        "anschliessend kantonsunabhängig alle Changesets dieser Person angezeigt.<3/><4/>Werden " +
                        "beide Kriterien verwendet, werden nur Changesets zurückgegeben, die auch beides erfüllen.<4/>",
                    "tags": {
                        "input": "Tags",
                        "placeholder": "key=value",
                        "inputHelperText": "Geben Sie Tags in Form von 'key=value' und einen Kanton ein.",
                    },
                    "area": {
                        "input": "Kanton",
                        "inputHelperText": "Sie müssen einen Kanton wählen, wenn Sie nach Objekt-Tags filtern wollen.",
                    },
                    "buffer": {
                        "input": "Buffer in Meter",
                        "placeholder": "Meter",
                    },
                    "user": {
                        "input": "Benutzer",
                    },
                },
                "realese": {
                    "sectionHeader": "Filter-Freigabe",
                    "inputInformation": "<2/>Den Filter können Sie für andere User freigeben, damit die" +
                        " Meldungen gemeinsam abgearbeitet können.<2/><1/>Die Mitarbeiter können den Filter einsehen, " +
                        "aber nicht bearbeiten.<1/>",
                    "input": "Mitarbeiter",
                },
                "placeholder": "OSM-Benutzer",

            },
            "delete": {
                "confirm": "Möchten Sie den Filter {{name}} wirklich löschen?",
                "isDeleted": "Der Filer wurde erfolgreich gelöscht",
                "poblem": "Der Filter {{name}} konnte nicht gelöscht werden.",
            },
            "error": {
                "title": "Fehlermeldung",
                "message": "Leider hat das nicht geklappt. Es ist ein Fehler beim Laden der Daten aufgetaucht. " +
                    "Bitte wiederholen Sie den Vorgang.",
                "isBackendError": "Bei häufigem Auftreten prüfen sie bitte die Verfügbarkeit des Backends. Ansonsten" +
                    " kann es sein, dass Overpass zurzeit nicht erreichbar ist.",
                "button": "Zurück zu Home",
            },
            "loading": "Loading",
        }
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "de",

        keySeparator: ".",

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
