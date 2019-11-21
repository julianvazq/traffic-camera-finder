/* Code for initializting the map */
/* code provided by the leaflet quickguide */
/* coordinates here are for college park */
let mymap = L.map('map').setView([38.987502, -76.942683], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(mymap);
/* testing some generic pop up and location */
/* coordinates are set to UMD at the moment */
var layer1 = L.layerGroup().addTo(mymap);
let umd_mark = L.marker([38.987502, -76.942683]).addTo(mymap);
umd_mark.bindPopup("The University of Maryland").openPopup();
umd_mark.addTo(layer1);

function loadSpeedCams(e) {
  e.preventDefault();
  fetch("/api/speed")
    .then(res => res.json())
    .then(res => {
      console.log("Speed Cameras array: ", res); // logging step to check what we got
      return res;
    }).then(res => mapSpeedData(res, true));
}

function loadRedLightCams(e) {
  e.preventDefault();
  fetch("/api/redlight")
    .then(res => res.json())
    .then(res => {
      console.log("Red Light Cameras array: ", res); // logging step to check what we got
      return res;
    }) .then(res => mapRedLightData(res, true));
}

function loadBoth(e) {
  e.preventDefault();

  fetch("/api/speed")
    .then(resSpeed => resSpeed.json())
    .then(resSpeed => {
      console.log("Speed Cameras array: ", resSpeed); 
      return resSpeed; // logging step to check what we got
    })
    .then(resSpeed => mapSpeedData(resSpeed, false))

    fetch("/api/redlight")
    .then(resRedLight => resRedLight.json())
    .then(resRedLight => {
      console.log("Red Light Cameras array: ", resRedLight);
      return resRedLight; // logging step to check what we got
    })
    .then(resRedLight => mapRedLightData(resRedLight, false));
}

const mapSpeedData = (arg, clearMap) => {
  if (clearMap) {
    layer1.clearLayers();
  }

  const speedCamIcon = L.icon({
    iconUrl: '../speed-camera-icon.svg',
    iconSize: [40, 80],
    iconAnchor: [22, 94],
});

  /* loop that displays all of the map points as pop ups */
  for (let i = 0; i < arg.length; i += 1){
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {icon: speedCamIcon}).addTo(mymap);
    umd_mark.bindPopup("<b>SPEED CAMERA</b></br>" + arg[i].street_address + "</br>" + "<b>Posted speed</b>: " + arg[i].posted_speed + "</br>" + "<b>Enforced speed</b>: " + arg[i].enforcement).openPopup();
    umd_mark.addTo(layer1);
  } 
}

const mapRedLightData = (arg, clearMap) => {
  if (clearMap) {
    layer1.clearLayers();
  }

  const redLightCamIcon = L.icon({
    iconUrl: '../red-light-camera-icon.svg',
    iconSize: [40, 80],
    iconAnchor: [22, 94],
});

  /* loop that displays all of the map points as pop ups */
  for (let i = 0; i < arg.length; i += 1){
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {icon: redLightCamIcon}).addTo(mymap);
    umd_mark.bindPopup("<b>RED LIGHT CAMERA</b></br>" + arg[i].street_address).openPopup();
    umd_mark.addTo(layer1);
  } 
}

let selectedInput = "speed";

document.querySelector(".btn").addEventListener("click", (e) => {
  if(selectedInput === "speed") {
    loadSpeedCams(e);
  }
  else if(selectedInput === "red light") {
    loadRedLightCams(e);
  }
  else {
    loadBoth(e);
  }
});
document.querySelector(".input-field").addEventListener("change", (e) => {
  selectedInput = e.target.value;
})
