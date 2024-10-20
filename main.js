let markers = []; // Global marker array to store dynamically added markers

// Function to initialize the map and handle marker clustering
function initMap() {
  // Map Options
  const mapOptions = {
    zoom: 10,
    center: { lat: 41.8168788, lng: -71.4623799 }, // Initial center of the map
    disableDefaultUI: true,
  };

  // Create the Google Map instance
  const map = new google.maps.Map(
    document.getElementById("google-map"),
    mapOptions
  );

  const waterMarker = "marker.png"; // Custom icon for markers

  const infoWindow = new google.maps.InfoWindow({
    minWidth: 200,
    maxWidth: 200,
  });

  const bounds = new google.maps.LatLngBounds(); // Bounds to fit all markers

  // Function to add a marker dynamically
  function addMarker(locationName, lat, lng, address, imageUrl) {
    const marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      icon: waterMarker,
    });

    const infoWindowContent = `
      <div class="water-content">
          <h3>${locationName}</h3>
          <p>Address: ${address}</p>
          <img src="${imageUrl}" alt="${locationName}" style="max-width:100%; height:auto;">
      </div>
    `;

    google.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(infoWindowContent);
      infoWindow.open(map, marker);
    });

    // Extend the map bounds to fit the new marker
    bounds.extend(marker.getPosition());

    // Add the marker to the global array
    markers.push(marker);
  }

  // Sample markers (initially hardcoded)
  const initialMarkers = [
    {
      locationName: "Deng-Away in Jakarta!",
      lat: -6.195214,
      lng: 106.821506,
      address: "Address for trusted organizations", // Placeholder address
      imageUrl: "logo.png", // Placeholder image
    },
    {
      locationName: "We're here!",
      lat: -6.395214,
      lng: 106.921506,
      address: "Address for trusted organizations", // Placeholder address
      imageUrl: "logo.png", // Placeholder image
    },
    {
      locationName: "Community!!",
      lat: -6.395214,
      lng: 106.621506,
      address: "Address for trusted organizations", // Placeholder address
      imageUrl: "logo.png", // Placeholder image
    },
    {
      locationName: "Togetherness!!",
      lat: -6.075214,
      lng: 106.621506,
      address: "Address for trusted organizations", // Placeholder address
      imageUrl: "logo.png", // Placeholder image
    },
  ];

  // Add initial markers
  initialMarkers.forEach((marker) => {
    addMarker(
      marker.locationName,
      marker.lat,
      marker.lng,
      marker.address,
      marker.imageUrl
    );
  });

  // Fit map bounds to include all markers
  map.fitBounds(bounds);

  // Marker clustering feature
  const markerCluster = new MarkerClusterer({ markers, map });
}

// Handle form submission (this would be in another JS file or within this script)
function handleFormSubmission(locationName, lat, lng, address, imageUrl) {
  // Add the user-submitted marker
  addMarker(locationName, lat, lng, address, imageUrl);
}
