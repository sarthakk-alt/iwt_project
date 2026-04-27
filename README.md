# ChronoCulture

Explore India's rich history through an interactive map. Pick a century, click a Point of Interest (POI), and read about its history, culture, food, and art — then leave a comment.

POIs are static (loaded from `data.json`). Comments are persisted in PostgreSQL via a Servlet API running on Apache Tomcat 9.

---

## Architecture

| Layer    | Tech                                                              |
| -------- | ----------------------------------------------------------------- |
| Frontend | HTML / CSS / Vanilla JS, Leaflet.js, OpenStreetMap                |
| Backend  | Java 11 Servlet API (javax.servlet) on Apache Tomcat 9            |
| Database | PostgreSQL (JDBC, `org.postgresql:postgresql`)                    |
| Build    | Maven (packages a `chronoculture.war`)                            |

Project layout:

```
iwt_project/
├── pom.xml
├── schema.sql
└── src/main/
    ├── java/com/iwt/
    │   ├── AppInitializer.java   # Initializes DB on startup
    │   ├── Db.java               # JDBC connection helper
    │   └── CommentServlet.java   # GET/POST /api/comments
    └── webapp/
        ├── index.html
        ├── script.js
        ├── style.css
        ├── data.json             # Static POIs
        └── WEB-INF/web.xml       # DB config defaults
```

---

## Prerequisites

- JDK 11+
- Maven 3.6+
- Apache Tomcat **9.x** (Tomcat 10 will NOT work — it uses `jakarta.*`)
- PostgreSQL 12+

---

## 1. Set up the database

```bash
createdb chronoculture
psql chronoculture < schema.sql
```

The schema creates a single `comments` table:

```
id          SERIAL PRIMARY KEY
poi_id      VARCHAR(255)        -- e.g. "18th:Delhi"
author      VARCHAR(100)
body        TEXT
created_at  TIMESTAMP
```

## 2. Configure DB credentials

Defaults live in `src/main/webapp/WEB-INF/web.xml`:

```xml
<context-param><param-name>db.url</param-name>
  <param-value>jdbc:postgresql://localhost:5432/chronoculture</param-value></context-param>
<context-param><param-name>db.user</param-name><param-value>postgres</param-value></context-param>
<context-param><param-name>db.password</param-name><param-value>postgres</param-value></context-param>
```

You can override any of these without rebuilding by setting environment variables before starting Tomcat:

```bash
export DB_URL="jdbc:postgresql://localhost:5432/chronoculture"
export DB_USER="postgres"
export DB_PASSWORD="yourpassword"
```

## 3. Build the WAR

```bash
mvn clean package
```

This produces `target/chronoculture.war`.

## 4. Deploy to Tomcat 9

Copy the WAR into Tomcat's `webapps/` directory and start Tomcat:

```bash
cp target/chronoculture.war $CATALINA_HOME/webapps/
$CATALINA_HOME/bin/catalina.sh run
```

Open <http://localhost:8080/chronoculture/>.

---

## API

### `GET /api/comments?poiId=<id>`

Returns comments for the given POI, newest first.

```json
[
  { "id": 1, "poiId": "18th:Delhi", "author": "Asha",
    "body": "Loved the Red Fort!", "createdAt": "2026-04-27T10:21:03Z" }
]
```

### `POST /api/comments`

```json
{ "poiId": "18th:Delhi", "author": "Asha", "body": "Great place!" }
```

Returns `201 Created` with the saved record. Validation: `poiId`, `author`, and `body` are required; `author` ≤ 100 chars, `body` ≤ 2000 chars.

The frontend builds `poiId` as `"<era>:<location.name>"` (e.g. `18th:Delhi`).

---

## Adding / editing POIs

POIs are static — edit `src/main/webapp/data.json` and rebuild. The schema per location is:

```json
{
  "name": "Delhi", "region": "Northern India",
  "lat": 28.7041, "lng": 77.1025, "icon": "🏰",
  "history": "...", "culture": "...", "food": "...", "art": "...",
  "historyFacts": ["..."], "cultureFacts": ["..."],
  "foodFacts": ["..."], "artFacts": ["..."]
}
```

---

## Tech credits

- Maps: [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- JSON: [org.json](https://github.com/stleary/JSON-java)
- JDBC: [PostgreSQL JDBC Driver](https://jdbc.postgresql.org/)
