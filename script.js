// Load historical data from JSON file
let historicalData = {};

// Fetch data from JSON file
async function loadHistoricalData() {
  try {
    console.log('Fetching data.json...');
    const response = await fetch('data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    historicalData = await response.json();
    let historicalData = {};
    console.log('Data loaded successfully:', Object.keys(historicalData));
let map;
let markers = [];
let currentMarker = null;

// Load JSON
async function loadHistoricalData() {
  try {
    const response = await fetch('data.json?v=6');
    historicalData = await response.json();
    return historicalData;
  } catch (error) {
    console.error('Error loading data:', error);
    alert('Error loading data.json');
    return null;
  }
}

// Map init
function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

// Clear markers
function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

// Display markers
function displayMarkers(era) {
  clearMarkers();

  if (!historicalData[era]) return;

  historicalData[era].forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng])
      .addTo(map)
      .on('click', () => displayLocationInfo(loc, era));

    markers.push(marker);
  });
}

// Display location info
function displayLocationInfo(location, era) {
  currentMarker = location;

  document.getElementById('info-placeholder').classList.add('hidden');
  document.getElementById('info-content').classList.remove('hidden');

  document.getElementById('info-location-name').textContent = location.name;
  document.getElementById('info-location-region').textContent = location.region;

  document.getElementById('tab-content-history').textContent = location.history;
  document.getElementById('tab-content-culture').textContent = location.culture;
  document.getElementById('tab-content-food').textContent = location.food;
  document.getElementById('tab-content-art').textContent = location.art;

  switchTab('history'); // default tab
  updateFacts(location, 'history');

  map.flyTo([location.lat, location.lng], 10);
}

// FACTS (NO FALLBACKS — PURE JSON)
function updateFacts(location, tab) {
  const factsGrid = document.getElementById('facts-grid');

  let facts = [];

  if (tab === 'history') facts = location.historyFacts;
  if (tab === 'culture') facts = location.cultureFacts;
  if (tab === 'food') facts = location.foodFacts;
  if (tab === 'art') facts = location.artFacts;

  factsGrid.innerHTML = `
    <h4 style="margin-bottom:8px;">${tab.toUpperCase()} FACTS</h4>
    ${facts.map(f => `<div class="fact-item">${f}</div>`).join('')}
  `;
}

// Tab switching
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-${tabName}`).classList.add('active');

  if (currentMarker) {
    updateFacts(currentMarker, tabName);
  }
}

// Timeline dropdown
function setupTimelineListener() {
  document.getElementById('timeline-select').addEventListener('change', e => {
    const era = e.target.value;

    if (era) displayMarkers(era);
    else clearMarkers();

    document.getElementById('info-placeholder').classList.remove('hidden');
    document.getElementById('info-content').classList.add('hidden');
  });
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadHistoricalData();
  if (!data) return;

  initMap();
  setupTimelineListener();

  const allLocations = [];
  for (const era in historicalData) {
    allLocations.push(...historicalData[era]);
  }

  document.getElementById('locations-scroll').innerHTML =
    allLocations.map(loc => `
      <div class="location-card" onclick="selectLocation('${loc.name}')">
        <div>${loc.name}</div>
        <small>${loc.region}</small>
      </div>
    `).join('');
});

// Select from cards
function selectLocation(name) {
  for (const era in historicalData) {
    const loc = historicalData[era].find(l => l.name === name);
    if (loc) {
      document.getElementById('timeline-select').value = era;
      document.getElementById('timeline-select').dispatchEvent(new Event('change'));

      setTimeout(() => displayLocationInfo(loc, era), 300);
      break;
    }
  }
}eys(historicalData));
    
    // Verify data structure
    for (const era in historicalData) {
      console.log(`  ${era}: ${historicalData[era].length} locations`);
    }
    
    return historicalData;
  } catch (error) {
    console.error('Error loading data:', error);
    alert('Error loading historical data. Please check the data.json file.');
    return null;
  }
}

let map;
let markers = [];
let currentMarker = null;

// India bounds to restrict map
const indiaBounds = {
  north: 35.5,
  south: 6.5,
  east: 97.5,
  west: 68.0
};

// Initialize the map
function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    minZoom: 4
  }).addTo(map);

  // Restrict map bounds to India
  const southWest = L.latLng(indiaBounds.south, indiaBounds.west);
  const northEast = L.latLng(indiaBounds.north, indiaBounds.east);
  const bounds = L.latLngBounds(southWest, northEast);
  
  map.setMaxBounds(bounds);
  map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
  });
}

// Clear existing markers
function clearMarkers() {
  if (!map) {
    console.warn('Map not initialized when trying to clear markers');
    return;
  }
  
  markers.forEach(marker => {
    try {
      map.removeLayer(marker);
    } catch (e) {
      console.warn('Error removing marker:', e);
    }
  });
  markers = [];
  console.log('Markers cleared');
}

// Add markers for selected era
function displayMarkers(era) {
  clearMarkers();

  if (!era || !historicalData[era]) {
    console.warn(`No data found for era: ${era}`);
    return;
  }

  console.log(`Displaying markers for era: ${era}`, historicalData[era].length, 'locations');

  historicalData[era].forEach(location => {
    const marker = L.marker([location.lat, location.lng]);

    marker.bindPopup(`<strong>${location.name}</strong><br/>${location.region}`, {
      maxWidth: 200
    });
    
    marker.on('click', () => {
      console.log('Marker clicked:', location.name);
      displayLocationInfo(location, era);
    });
    
    marker.addTo(map);
    markers.push(marker);
  });

  console.log(`Added ${markers.length} markers to map`);
}

// Display location information in the info panel
function displayLocationInfo(location, era) {
  currentMarker = location;

  const infoPanel = document.getElementById('info-panel');
  const placeholder = document.getElementById('info-placeholder');
  const content = document.getElementById('info-content');

  // Hide placeholder, show content
  placeholder.classList.add('hidden');
  content.classList.remove('hidden');

  // Update header
  document.getElementById('info-era-badge').textContent = `${era === 'modern' ? 'Modern Era' : era.charAt(0).toUpperCase() + era.slice(1) + ' Century'} (${getEraYears(era)})`;
  document.getElementById('info-location-name').textContent = location.name;
  document.getElementById('info-location-region').textContent = location.region;

  // Update tabs
  document.getElementById('tab-content-history').textContent = location.history;
  document.getElementById('tab-content-culture').textContent = location.culture;
  document.getElementById('tab-content-food').textContent = location.food;
  document.getElementById('tab-content-art').textContent = location.art;

  // Reset to history tab
  switchTab('history');

  // Update facts
  const factsGrid = document.getElementById('facts-grid');
  factsGrid.innerHTML = location.facts
    .map(fact => `<div class="fact-item">${fact}</div>`)
    .join('');

  // Generate a quote
  const quotes = [
    `"${location.name} tells the story of India's journey through time."`,
    `"History lives in every corner of ${location.name}."`,
    `"${location.name} is a testament to India's rich heritage."`,
    `"Explore the depths of culture in ${location.name}."`
  ];
  document.getElementById('info-quote').innerHTML = `<p>${quotes[Math.floor(Math.random() * quotes.length)]}</p>`;

  // Center map on marker
  map.flyTo([location.lat, location.lng], 10, { duration: 1.5 });

  // Show directions popup
  showDirections(location);
}

// Get era year range
function getEraYears(era) {
  const eraMap = {
    '18th': '1700–1799',
    '19th': '1800–1899',
    '20th': '1900–1999',
    'modern': '2000–Present'
  };
  return eraMap[era] || '';
}

// Show directions information
function showDirections(location) {
  // Create a simple popup with directions info
  const popup = L.popup()
    .setLatLng([location.lat, location.lng])
    .setContent(`
      <div style="font-size: 12px; max-width: 200px;">
        <strong>${location.name}</strong><br/>
        <em>${location.region}</em><br/>
        <small style="color: #666;">
          Coordinates: ${location.lat.toFixed(2)}°N, ${location.lng.toFixed(2)}°E<br/>
          <a href="https://www.google.com/maps?q=${location.lat},${location.lng}" target="_blank" style="color: #0066cc;">
            Open in Google Maps
          </a>
        </small>
      </div>
    `)
    .openOn(map);
}

// Switch between tabs
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  // Show selected tab
  document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Timeline select change handler
function setupTimelineListener() {
  const timelineSelect = document.getElementById('timeline-select');
  if (!timelineSelect) {
    console.error('Timeline select element not found');
    return;
  }
  
  timelineSelect.addEventListener('change', (e) => {
    const era = e.target.value;

    if (era) {
      displayMarkers(era);

      // Hide info panel and show placeholder
      document.getElementById('info-placeholder').classList.remove('hidden');
      document.getElementById('info-content').classList.add('hidden');
    } else {
      clearMarkers();
      document.getElementById('info-placeholder').classList.remove('hidden');
      document.getElementById('info-content').classList.add('hidden');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Page loaded, initializing...');
  
  // Load data from JSON first
  const data = await loadHistoricalData();
  if (!data) {
    console.error('Failed to load historical data');
    return;
  }
  console.log('Historical data loaded successfully');
  
  // Then initialize map
  initMap();
  console.log('Map initialized');
  
  // Setup timeline selector listener
  setupTimelineListener();
  console.log('Timeline listener setup complete');

  // Populate featured locations strip
  const allLocations = [];
  for (const era in historicalData) {
    allLocations.push(...historicalData[era]);
  }

  console.log(`Total locations: ${allLocations.length}`);

  const locationsScroll = document.getElementById('locations-scroll');
  if (!locationsScroll) {
    console.error('locations-scroll element not found');
    return;
  }
  
  locationsScroll.innerHTML = allLocations
    .map(loc => `
      <div class="location-card" onclick="selectLocation('${loc.name}')">
        <div class="card-name">${loc.name}</div>
        <div class="card-region">${loc.region}</div>
      </div>
    `)
    .join('');
    
  console.log('Featured locations populated');
});

// Select location from featured locations strip
function selectLocation(locationName) {
  // Find the location across all eras
  for (const era in historicalData) {
    const location = historicalData[era].find(loc => loc.name === locationName);
    if (location) {
      // Set the timeline selector
      document.getElementById('timeline-select').value = era;
      document.getElementById('timeline-select').dispatchEvent(new Event('change'));
      // Display the location info
      setTimeout(() => displayLocationInfo(location, era), 300);
      break;
    }
  }
}
