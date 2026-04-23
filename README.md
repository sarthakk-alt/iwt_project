# ChronoCulture

explore history through events, art, and culture—all in one interactive experience

---

## Implementation Details
ChronoCulture is a web app that combines:
- An **interactive timeline** of historical events.
- A **map** showing cultural artifacts, art, and media from each era.
- **User comments** to share insights or stories about events/places.

All data is stored in your browser - indexed db or localStorage.

---

## Features
Interactive Timeline – Scroll through history, click events for details.
Cultural Map – See where art, music, and literature were created.
Add Comments – Share your thoughts on events/places (saved locally).
No Backend – Uses `localStorage`/`IndexedDB` for comments.
Free & Open – Built with OpenStreetMap, Leaflet.js, and TimelineJS.

---

## Tech Stack
- **Timeline:** [TimelineJS](https://timeline.knightlab.com/)
- **Maps:** [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- **Comments:** `localStorage` or `IndexedDB`
- **Hosting:** GitHub Pages, Netlify, or any static host

## Implementation
We will source data from various sites. For now the implementation will be country specific. Timeline will be country specific.
---

## How to Use
1. **Browse the timeline** – Click events to see details and related culture.
2. **Explore the map** – Find where art, books, and music were made.
3. **Add comments** – Share your thoughts (saved in your browser).

---

## How to Contribute
2. **Add events/media** – Edit the Google Sheet for TimelineJS or the `data.js` file.
3. **Improve the map** – Add more cultural pins or fix locations.
4. **Submit a PR** – Help make history more interactive!

**Data sources:** Wikimedia Commons, Internet Archive, OpenStreetMap.

---
