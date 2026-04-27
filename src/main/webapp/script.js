let historicalData = {};
let map;
let markers = [];
let currentMarker = null;
let currentEra = null;

const indiaBounds = { north: 35.5, south: 6.5, east: 97.5, west: 68.0 };

async function loadHistoricalData() {
  const res = await fetch('data.json');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  historicalData = await res.json();
  return historicalData;
}

function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    minZoom: 4
  }).addTo(map);
  const bounds = L.latLngBounds(
    L.latLng(indiaBounds.south, indiaBounds.west),
    L.latLng(indiaBounds.north, indiaBounds.east)
  );
  map.setMaxBounds(bounds);
  map.on('drag', () => map.panInsideBounds(bounds, { animate: false }));
}

function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

function buildMarkerIcon(active) {
  return L.divIcon({
    className: 'cc-marker' + (active ? ' active' : ''),
    html: '<span class="cc-marker-dot"></span><span class="cc-marker-pulse"></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
}

function setActiveMarker(marker) {
  markers.forEach(m => m.setIcon(buildMarkerIcon(false)));
  if (marker) marker.setIcon(buildMarkerIcon(true));
}

function displayMarkers(era) {
  clearMarkers();
  if (!era || !historicalData[era]) return;
  historicalData[era].forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: buildMarkerIcon(false) })
      .bindPopup(buildPopupHtml(loc))
      .on('click', () => {
        displayLocationInfo(loc, era);
        setActiveMarker(marker);
      });
    marker.addTo(map);
    marker._loc = loc;
    markers.push(marker);

    // Lazy-load image into popup when it opens.
    marker.on('popupopen', async () => {
      const img = await fetchImage(loc.name, loc.region);
      const popupEl = marker.getPopup();
      if (img && popupEl) {
        popupEl.setContent(buildPopupHtml(loc, img));
      }
    });
  });
}

function buildPopupHtml(loc, img) {
  const imgHtml = img
    ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(loc.name)}" class="popup-img"/>`
    : '';
  return `<div class="popup-card">${imgHtml}<strong>${escapeHtml(loc.name)}</strong><br/><span class="popup-region">${escapeHtml(loc.region)}</span></div>`;
}

function getEraLabel(era) {
  return ({
    '18th': '18th Century (1700–1799)',
    '19th': '19th Century (1800–1899)',
    '20th': '20th Century (1900–1999)',
    'modern': 'Modern Era (2000–Present)'
  })[era] || '';
}

async function displayLocationInfo(location, era) {
  currentMarker = location;
  currentEra = era;

  document.getElementById('info-placeholder').classList.add('hidden');
  document.getElementById('info-content').classList.remove('hidden');

  document.getElementById('info-era-badge').textContent = getEraLabel(era);
  document.getElementById('info-location-name').textContent = location.name;
  document.getElementById('info-location-region').textContent = location.region;

  renderHero(location);

  document.getElementById('tab-content-history').textContent = location.history;
  document.getElementById('tab-content-culture').textContent = location.culture;
  document.getElementById('tab-content-food').textContent = location.food;
  document.getElementById('tab-content-art').textContent = location.art;

  switchTab('history');
  map.flyTo([location.lat, location.lng], 8, { duration: 1.2 });
  loadComments(poiId(location, era));
}

function updateFacts(location, tab) {
  const facts = location[`${tab}Facts`] || [];
  document.getElementById('facts-grid').innerHTML =
    facts.map(f => `<div class="fact-item">${f}</div>`).join('');
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-${tabName}`).classList.add('active');
  if (currentMarker) updateFacts(currentMarker, tabName);
}

function setupTimelineListener() {
  document.getElementById('timeline-select').addEventListener('change', e => {
    const era = e.target.value;
    if (era) displayMarkers(era);
    else clearMarkers();
    document.getElementById('info-placeholder').classList.remove('hidden');
    document.getElementById('info-content').classList.add('hidden');
  });
}

function selectLocation(name) {
  for (const era in historicalData) {
    const loc = historicalData[era].find(l => l.name === name);
    if (loc) {
      document.getElementById('timeline-select').value = era;
      displayMarkers(era);
      setTimeout(() => displayLocationInfo(loc, era), 200);
      return;
    }
  }
}

// ----- Images (Wikipedia) -----

const IMG_CACHE_KEY = 'cc_img_cache_v1';
const imgMemCache = (() => {
  try { return JSON.parse(localStorage.getItem(IMG_CACHE_KEY)) || {}; }
  catch { return {}; }
})();
const imgInflight = {};

function persistImgCache() {
  try { localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(imgMemCache)); } catch {}
}

async function wikiSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}?redirect=true`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data && data.thumbnail && data.thumbnail.source
    ? { src: data.thumbnail.source, extract: data.extract || '' }
    : null;
}

async function fetchImage(name, region) {
  if (name in imgMemCache) return imgMemCache[name];
  if (imgInflight[name]) return imgInflight[name];

  imgInflight[name] = (async () => {
    const queries = [
      region ? `${name}, ${region}` : null,
      name
    ].filter(Boolean);
    for (const q of queries) {
      try {
        const r = await wikiSummary(q);
        if (r) {
          imgMemCache[name] = r;
          persistImgCache();
          return r;
        }
      } catch {}
    }
    imgMemCache[name] = null;
    persistImgCache();
    return null;
  })();
  return imgInflight[name];
}

async function renderHero(location) {
  const heroImg = document.getElementById('info-hero-image');
  const heroCap = document.getElementById('info-hero-caption');
  heroImg.classList.add('loading');
  heroImg.style.backgroundImage = '';
  heroCap.textContent = '';

  // Allow override via data.json `image` field.
  if (location.image) {
    heroImg.classList.remove('loading');
    heroImg.style.backgroundImage = `url("${location.image}")`;
    return;
  }

  const data = await fetchImage(location.name, location.region);
  // Skip stale renders if user clicked another marker meanwhile.
  if (!currentMarker || currentMarker.name !== location.name) return;
  heroImg.classList.remove('loading');
  if (data) {
    heroImg.style.backgroundImage = `url("${data.src}")`;
    heroCap.textContent = data.extract ? data.extract.slice(0, 180) + (data.extract.length > 180 ? '…' : '') : '';
  } else {
    heroImg.classList.add('empty');
  }
}

async function attachCardThumb(cardEl, name, region) {
  const data = await fetchImage(name, region);
  if (data) cardEl.style.setProperty('--card-bg', `url("${data.src}")`);
  cardEl.classList.add('has-thumb-resolved');
  if (data) cardEl.classList.add('has-thumb');
}

// ----- Comments -----

function poiId(location, era) {
  return `${era}:${location.name}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch { return iso; }
}

async function loadComments(id) {
  const list = document.getElementById('comments-list');
  list.innerHTML = '<p class="comments-empty">Loading…</p>';
  try {
    const res = await fetch(`api/comments?poiId=${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const items = await res.json();
    renderComments(items);
  } catch (e) {
    list.innerHTML = `<p class="comments-empty error">Could not load comments (${escapeHtml(e.message)})</p>`;
  }
}

function renderComments(items) {
  const list = document.getElementById('comments-list');
  if (!items.length) {
    list.innerHTML = '<p class="comments-empty">No comments yet. Be the first!</p>';
    return;
  }
  list.innerHTML = items.map(c => `
    <div class="comment">
      <div class="comment-head">
        <span class="comment-author">${escapeHtml(c.author)}</span>
        <span class="comment-date">${escapeHtml(formatDate(c.createdAt))}</span>
      </div>
      <p class="comment-body">${escapeHtml(c.body)}</p>
    </div>
  `).join('');
}

async function submitComment(ev) {
  ev.preventDefault();
  if (!currentMarker) return;

  const author = document.getElementById('comment-author').value.trim();
  const body = document.getElementById('comment-body').value.trim();
  const status = document.getElementById('comment-status');
  if (!author || !body) {
    status.textContent = 'Name and comment are required.';
    return;
  }

  status.textContent = 'Posting…';
  try {
    const res = await fetch('api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        poiId: poiId(currentMarker, currentEra),
        author,
        body
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || ('HTTP ' + res.status));
    }
    document.getElementById('comment-body').value = '';
    status.textContent = '';
    await loadComments(poiId(currentMarker, currentEra));
  } catch (e) {
    status.textContent = 'Could not post: ' + e.message;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadHistoricalData();
  } catch (e) {
    document.getElementById('info-placeholder').innerHTML =
      `<p class="error">Failed to load data.json: ${escapeHtml(e.message)}</p>`;
    return;
  }

  initMap();
  setupTimelineListener();

  const allLocations = [];
  for (const era in historicalData) {
    historicalData[era].forEach(l => allLocations.push({ ...l, _era: era }));
  }

  const scroll = document.getElementById('locations-scroll');
  scroll.innerHTML = allLocations.map((loc, i) => `
    <div class="location-card" data-idx="${i}">
      <div class="card-thumb"></div>
      <div class="card-body">
        <div class="card-name">${escapeHtml(loc.name)}</div>
        <div class="card-region">${escapeHtml(loc.region)}</div>
      </div>
    </div>
  `).join('');

  scroll.querySelectorAll('.location-card').forEach(card => {
    const loc = allLocations[+card.dataset.idx];
    card.addEventListener('click', () => selectLocation(loc.name));
    attachCardThumb(card, loc.name, loc.region);
  });

  document.getElementById('comment-form').addEventListener('submit', submitComment);
});
