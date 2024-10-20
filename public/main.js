let map;
let markers = [];
let bounds;
let infoWindow;

async function initMap() {
  // Request needed libraries from Google Maps API
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");

  // Map Options
  const mapOptions = {
    zoom: 10,
    center: { lat: -6.195214, lng: 106.821506 }, // Initial center of the map
    disableDefaultUI: true,
  };

  // Create the Google Map instance
  map = new Map(document.getElementById("google-map"), mapOptions);

  // InfoWindow to show on marker click
  infoWindow = new InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  bounds = new google.maps.LatLngBounds(); // Bounds to fit all markers

  // Sample marker data (you can replace this with dynamic data)
  const locations = [
    {
      locationName: "Deng-Away in Jakarta!",
      lat: -6.195214,
      lng: 106.821506,
      address: "Address for trusted organizations",
      imageUrl: "logo.png",
    },
    {
      locationName: "We're here!",
      lat: -6.395214,
      lng: 106.921506,
      address: "Address for trusted organizations",
      imageUrl: "logo.png",
    },
    {
      locationName: "Community!!",
      lat: -6.395214,
      lng: 106.621506,
      address: "Address for trusted organizations",
      imageUrl: "logo.png",
    },
    {
      locationName: "Togetherness!!",
      lat: -6.075214,
      lng: 106.621506,
      address: "Address for trusted organizations",
      imageUrl: "logo.png",
    },
  ];

  // Loop through the locations array to add markers
  locations.forEach((location) => {
    addMarker(location);
  });

  // Create a new MarkerClusterer instance and pass in the markers array
  new markerClusterer.MarkerClusterer({
    map: map,
    markers: markers,
  });

  // Fit the map bounds to include all markers
  map.fitBounds(bounds);
}

// Make addMarker globally accessible
// Make addMarker globally accessible
window.addMarker = function (location) {
  const marker = new google.maps.Marker({
    position: { lat: location.lat, lng: location.lng },
    map: map,
    title: location.locationName,
    icon: "marker.png", // Custom icon
  });

  const defaultImageUrl = "marker.png"; // Set your blank image path here
  const infoWindowContent = `
        <div class="water-content">
            <h3>${location.locationName}</h3>
            <p>Address: ${location.address}</p>
            <img src="${location.imageUrl || defaultImageUrl}" alt="${
    location.locationName
  }">
        </div>
    `;

  // Add click listener to show InfoWindow
  marker.addListener("click", () => {
    infoWindow.setContent(infoWindowContent);
    infoWindow.open(map, marker);
  });

  markers.push(marker); // Add marker to the markers array

  // Check if bounds is defined before using it
  if (bounds) {
    bounds.extend(marker.getPosition()); // Extend bounds to include the marker position
  }
};
