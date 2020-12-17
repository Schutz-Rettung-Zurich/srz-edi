# Targeted Monitoring Installation

# Allgemein

* Frontend: https://gitlab.dev.ifs.hsr.ch/se-na/sa-monitoring-osm-frontend
* Backend: https://gitlab.dev.ifs.hsr.ch/DNA/sa-monitoring-osm-backend
* Bedienungsanleitung: [Hier](./UserManual.md)

# Installation

Sie können den Code über die oben verlinkten Repositories downloaden und so Ihre eigene Backend- und Frontendinstanz laufen lassen.

Voraussetzung sind 2 Ports. Der für das Frontend muss vom Browser des Benutzers erreichbar sein. Und der vom Backend muss das Beziehen von Changesets im Planet-OSM erlauben, sowie den zugriff durch das Frontend.

## Run in Docker

### Voraussetzung

* Linux mit installiertem Docker und Docker-compose
* 4GB freier Festplattenspeicher
* 2 Ports, die vergeben werden können

### OAuth Tool registrieren

1. Auth Consumer registrieren (Dokumentation)[https://wiki.openstreetmap.org/wiki/DE:OAuth]

### Backend

1. Download Code vom oben verlinkten Backend-Repository
2. Die .env Datei anpassen, dabei gibt es folgende Möglichkeiten:

Environment Variable |	Django Setting |	Development Default |	Production Default
---|---|---|---
DJANGO_CACHES |	CACHES (default) |	locmem |	redis
DJANGO_DEBUG |	DEBUG |	True |	False
DJANGO_SECRET_KEY |	SECRET_KEY |	CHANGEME!!! |	raises error
DJANGO_SECURE_BROWSER_XSS_FILTER |	SECURE_BROWSER_XSS_FILTER |	n/a |	True
DJANGO_SECURE_SSL_REDIRECT |	SECURE_SSL_REDIRECT |	n/a |	True
DJANGO_SECURE_CONTENT_TYPE_NOSNIFF |	SECURE_CONTENT_TYPE_NOSNIFF |	n/a |	True
DJANGO_SECURE_FRAME_DENY |	SECURE_FRAME_DENY |	n/a |	True
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS |	HSTS_INCLUDE_SUBDOMAINS |	n/a |	True
DJANGO_SESSION_COOKIE_HTTPONLY |	SESSION_COOKIE_HTTPONLY |	n/a |	True
DJANGO_SESSION_COOKIE_SECURE |	SESSION_COOKIE_SECURE |	n/a |	False
DJANGO_DEFAULT_FROM_EMAIL |	DEFAULT_FROM_EMAIL |	n/a |	"osmcha-django <noreply@example.com>"
DJANGO_SERVER_EMAIL |	SERVER_EMAIL |	n/a |	"osmcha-django <noreply@example.com>"
DJANGO_EMAIL_SUBJECT_PREFIX |	EMAIL_SUBJECT_PREFIX |	n/a |	"[osmcha-django] "
DJANGO_CHANGESETS_FILTER |	CHANGESETS_FILTER |	None |	None
POSTGRES_USER |	POSTGRES_USER |	None |	None
POSTGRES_PASSWORD |	POSTGRES_PASSWORD |	None |	None
PGHOST |	PGHOST |	localhost |	localhost
OAUTH_OSM_KEY |	SOCIAL_AUTH_OPENSTREETMAP_KEY |	None |	None
OAUTH_OSM_SECRET |	SOCIAL_AUTH_OPENSTREETMAP_SECRET |	None |	None
OSM_VIZ_TOOL_LINK |	VIZ_TOOL_LINK |	https://osmlab.github.io/changeset-map/# 	https://osmlab.github.io/changeset-map/#
DJANGO_ANON_USER_THROTTLE_RATE |	ANON_USER_THROTTLE_RATE |	None |	30/min
DJANGO_COMMON_USER_THROTTLE_RATE |	COMMON_USER_THROTTLE_RATE |	None |	180/min
DJANGO_NON_STAFF_USER_THROTTLE_RATE |	NON_STAFF_USER_THROTTLE_RATE |	3/min |	3/min
OAUTH_REDIRECT_URI |	OAUTH_REDIRECT_URI |	http://localhost:8000/oauth-landing.html |	http://localhost:8000/oauth-landing.html
OSMCHA_FRONTEND_VERSION |	OSMCHA_FRONTEND_VERSION |	oh-pages |	oh-pages
DJANGO_ENABLE_CHANGESET_COMMENTS |	ENABLE_POST_CHANGESET_COMMENTS | 	False |	False
DJANGO_OSM_COMMENTS_API_KEY |	OSM_COMMENTS_API_KEY |	'' |	''

Dabei zwingend sind folgende Variablen:
* POSTGRES_USER
* POSTGRES_PASSWORD
* DJANGO_SETTINGS_MODULE
* OAUTH_OSM_KEY
* OAUTH_OSM_SECRET
* OAUTH_REDIRECT_URI

3. `docker-compose up --build` ausführen

### Frontend

1. Download Code vom oben verlinkten Frontend-Repository
2. .env richtig konfigurieren:

Variable | Wert
---|---
REACT_APP_HOME_URL | URL zu ihrer Frontendpage "wird im docker run angegeben"
REACT_APP_API| URL zu ihrem Backend
3. docker build `docker build --tag targetedmonitoring:latest ~/sa-monitoring-osm-frontend`
4. docker run `docker run -p yourPort:80 -d --name frontendcontainer targetedmonitoring:latest`

## Run ohne Docker

### OAuth Tool registrieren

1. Auth Consumer registrieren (Dokumentation)[https://wiki.openstreetmap.org/wiki/DE:OAuth]

### Backend

Folgendes muss installiert sein:
* pip
* virtualenv
* PostgreSQL (mit Benutzer und Passwort wie in env festgelegt)

1. Download Code vom oben verlinkten Backend-Repository
2. Die .env Datei anpassen, dabei gibt es folgende Möglichkeiten:

Environment Variable |	Django Setting |	Development Default |	Production Default
---|---|---|---
DJANGO_CACHES |	CACHES (default) |	locmem |	redis
DJANGO_DEBUG |	DEBUG |	True |	False
DJANGO_SECRET_KEY |	SECRET_KEY |	CHANGEME!!! |	raises error
DJANGO_SECURE_BROWSER_XSS_FILTER |	SECURE_BROWSER_XSS_FILTER |	n/a |	True
DJANGO_SECURE_SSL_REDIRECT |	SECURE_SSL_REDIRECT |	n/a |	True
DJANGO_SECURE_CONTENT_TYPE_NOSNIFF |	SECURE_CONTENT_TYPE_NOSNIFF |	n/a |	True
DJANGO_SECURE_FRAME_DENY |	SECURE_FRAME_DENY |	n/a |	True
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS |	HSTS_INCLUDE_SUBDOMAINS |	n/a |	True
DJANGO_SESSION_COOKIE_HTTPONLY |	SESSION_COOKIE_HTTPONLY |	n/a |	True
DJANGO_SESSION_COOKIE_SECURE |	SESSION_COOKIE_SECURE |	n/a |	False
DJANGO_DEFAULT_FROM_EMAIL |	DEFAULT_FROM_EMAIL |	n/a |	"osmcha-django <noreply@example.com>"
DJANGO_SERVER_EMAIL |	SERVER_EMAIL |	n/a |	"osmcha-django <noreply@example.com>"
DJANGO_EMAIL_SUBJECT_PREFIX |	EMAIL_SUBJECT_PREFIX |	n/a |	"[osmcha-django] "
DJANGO_CHANGESETS_FILTER |	CHANGESETS_FILTER |	None |	None
POSTGRES_USER |	POSTGRES_USER |	None |	None
POSTGRES_PASSWORD |	POSTGRES_PASSWORD |	None |	None
PGHOST |	PGHOST |	localhost |	localhost
OAUTH_OSM_KEY |	SOCIAL_AUTH_OPENSTREETMAP_KEY |	None |	None
OAUTH_OSM_SECRET |	SOCIAL_AUTH_OPENSTREETMAP_SECRET |	None |	None
OSM_VIZ_TOOL_LINK |	VIZ_TOOL_LINK |	https://osmlab.github.io/changeset-map/# 	https://osmlab.github.io/changeset-map/#
DJANGO_ANON_USER_THROTTLE_RATE |	ANON_USER_THROTTLE_RATE |	None |	30/min
DJANGO_COMMON_USER_THROTTLE_RATE |	COMMON_USER_THROTTLE_RATE |	None |	180/min
DJANGO_NON_STAFF_USER_THROTTLE_RATE |	NON_STAFF_USER_THROTTLE_RATE |	3/min |	3/min
OAUTH_REDIRECT_URI |	OAUTH_REDIRECT_URI |	http://localhost:8000/oauth-landing.html |	http://localhost:8000/oauth-landing.html
OSMCHA_FRONTEND_VERSION |	OSMCHA_FRONTEND_VERSION |	oh-pages |	oh-pages
DJANGO_ENABLE_CHANGESET_COMMENTS |	ENABLE_POST_CHANGESET_COMMENTS | 	False |	False
DJANGO_OSM_COMMENTS_API_KEY |	OSM_COMMENTS_API_KEY |	'' |	''

Dabei zwingend sind folgende Variablen:
* POSTGRES_USER
* POSTGRES_PASSWORD
* DJANGO_SETTINGS_MODULE
* OAUTH_OSM_KEY
* OAUTH_OSM_SECRET
* OAUTH_REDIRECT_URI

3. Installiere einige Packages auf dem System `sudo ./install_os_dependencies.sh install`

4. Aktivieren der virtualenv
    1. `source venv/bin/activate`
    2. `source settings.env`

5. Installiere die lokalen Requirements
`pip install -r requirements/local.txt`

6. Datenbank erstellen
`createdb osmcha`

7. Datenbank abfüllen
`python manage.py migrate`

8. Server starten
`python manage.py runserver_plus`

### Frontend

Folgendes muss installiert sein:
* Node.js

1. Download Code vom oben verlinkten Frontend-Repository
2. Installiere die benötigten Packages. Dazu soll der Befehl `npm i` im Root-Ordner ausgeführt werden.
3. .env richtig konfigurieren

Variable | Wert
---|---
REACT_APP_HOME_URL | http://localhost:3000/
REACT_APP_API| URL zu ihrem Backend
4. Webapplikation im Developmentmodus starten `npm start`
Starten der App im Produktionsmodus `npm run build`
Unter http://localhost:3000 können Sie die App ansehen. Die Seite wird neu geladen, wenn sie Änderungen vornehmen

## Login ohne Frontend

* Post-Request an `<your_base_url>/api/v1/social-auth/` dann erhalten Sie die folgenden Keys: `oauth_token`, `oauth_token_secret`
* Mit dem `oauth_token` starten Sie eine Anfrage zu `https://www.openstreetmap.org/oauth/authorize?oauth_token=<oauth_token>`
* Dort muss sich der Benutzer einloggen und den Zugriff genehmigen. Danach wird man zur im env definierten Rücksprung-Adresse geführt und erhält ein `oauth_verifier` per URL-String.
* Noch einmal senden Sie einen Post-Request an `<your_base_url>/api/v1/social-auth/`, aber dieses Mal mit den `oauth_token`, `oauth_token_secret` und `oauth_verifier` im Body.
* Im Anschluss erhalten Sie ein Token, welches Sie dann immer im Header angeben müssen: `Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`