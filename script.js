const getLocationButton = document.getElementById("getLocationButton");
const removeLocationButton = document.getElementById("removeLocationButton");
const mapElement = document.getElementById("map");

// Check if the Geolocation API is supported by the user's browser
if (navigator.geolocation) {
  getLocationButton.disabled = false;
} else {
  getLocationButton.disabled = true;
  alert("Geolocation is not supported by this browser.");
}

// Get the user's location and save it in localStorage
function getLocation() {
  getLocationButton.disabled = true;
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);
  displayMap(lat, long);
  getLocationButton.disabled = true;
  removeLocationButton.disabled = false;
}

// Display the user's location on a map using Google Maps
function displayMap(lat, long) {
  const mapUrl = `https://maps.google.com/maps?q=18.739199, 73.683052&output=embed`;
  const mapHtml = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
  mapElement.innerHTML = mapHtml;
}

// Remove the user's location from localStorage
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  mapElement.innerHTML = "";
  getLocationButton.disabled = false;
  removeLocationButton.disabled = true;
}

// Check if the user's location is already stored in localStorage
const storedLat = localStorage.getItem("lat");
const storedLong = localStorage.getItem("long");
if (storedLat && storedLong) {
  displayMap(storedLat, storedLong);
  getLocationButton.disabled = true;
  removeLocationButton.disabled = false;
}

// Add event listeners
getLocationButton.addEventListener("click", getLocation);
removeLocationButton.addEventListener("click", removeLocation);