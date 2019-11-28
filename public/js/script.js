/* Code for initializting the map */
/* code provided by the leaflet quickguide */
/* coordinates here are for Joint Base Andrews in PG County */
let mymap = L.map("map").setView([38.7965, -76.8836], 10);

const testudo = L.icon({
  iconUrl: "../icons/testudo.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25]
});

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox.streets"
  }
).addTo(mymap);
/* testing some generic pop up and location */
/* coordinates are set to UMD at the moment */
var layer1 = L.layerGroup().addTo(mymap);
let umd_mark = L.marker([38.987502, -76.942683], { icon: testudo }).addTo(
  mymap
);
umd_mark.bindPopup("<b>University of Maryland</b>").openPopup();
umd_mark.addTo(layer1);

function loadSpeedCams(e) {
  e.preventDefault();
  fetch("/api/speed")
    .then(res => res.json())
    .then(res => {
      console.log("Speed Cameras array: ", res); // logging step to check what we got
      return res;
    })
    .then(res => mapSpeedData(res));
}

function loadRedLightCams(e) {
  e.preventDefault();
  fetch("/api/redlight")
    .then(res => res.json())
    .then(res => {
      console.log("Red Light Cameras array: ", res); // logging step to check what we got
      return res;
    })
    .then(res => mapRedLightData(res));
}

function loadBoth(e) {
  e.preventDefault();

  // We clear the map here to avoid mapRedLightData clearing the speed cam icons
  layer1.clearLayers();

  fetch("/api/speed")
    .then(resSpeed => resSpeed.json())
    .then(resSpeed => {
      console.log("Speed Cameras array: ", resSpeed); // logging step to check what we got
      return resSpeed;
    })
    .then(resSpeed => mapSpeedData(resSpeed, false));

  fetch("/api/redlight")
    .then(resRedLight => resRedLight.json())
    .then(resRedLight => {
      console.log("Red Light Cameras array: ", resRedLight); // logging step to check what we got
      return resRedLight;
    })
    .then(resRedLight => mapRedLightData(resRedLight, false));
}

function loadPoliceStations(e) {
  e.preventDefault();

  fetch("/api/police")
    .then(resPolice => resPolice.json())
    .then(resPolice => {
      console.log("Police stations array: ", resPolice); // logging step to check what we got
      return resPolice;
    })
    .then(resPolice => mapPoliceData(resPolice));
  }

const mapSpeedData = (arg, clearMap = true) => {
    
  if (clearMap) {
    layer1.clearLayers();
    }

  const speedCamIcon = L.icon({
    iconUrl: "../icons/speed-camera-icon.svg",
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3]
  });

  /* loop that displays all of the map points as pop ups */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: speedCamIcon
    }).addTo(mymap);
    umd_mark
      .bindPopup(
        "<b>SPEED CAMERA</b></br>" +
          arg[i].street_address +
          "</br>" +
          "<b>Posted speed</b>: " +
          arg[i].posted_speed +
          "</br>" +
          "<b>Enforced speed</b>: " +
          arg[i].enforcement
      )
      .openPopup();
    umd_mark.addTo(layer1);
  }
};

const mapRedLightData = (arg, clearMap = true) => {
  
  if (clearMap) {
  layer1.clearLayers();
  }

  const redLightCamIcon = L.icon({
    iconUrl: "../icons/red-light-camera-icon.svg",
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3]
  });

  /* loop that displays all of the map points as markers */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: redLightCamIcon
    }).addTo(mymap);
    umd_mark
      .bindPopup("<b>RED LIGHT CAMERA</b></br>" + arg[i].street_address)
      .openPopup();
    umd_mark.addTo(layer1);
  }
};

const mapPoliceData = (arg) => {
    layer1.clearLayers();

  const policeIcon = L.icon({
    iconUrl: "../icons/police-station-icon.svg",
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3]
  });

  /* loop that displays all of the map points as markers */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: policeIcon
    }).addTo(mymap);
    umd_mark
      .bindPopup( "<b>POLICE STATION</b></br>" +
      "<b>Station name</b>: " +
      arg[i].name +
      "</br>" +
      "<b>Telephone:</b>: " +
      arg[i].telephone)
      .openPopup();
    umd_mark.addTo(layer1);
  }
};

let selectedInput = "speed";

document.querySelector(".btn").addEventListener("click", e => {
  if (selectedInput === "speed") {
    loadSpeedCams(e);
    document.querySelector(".speed-camera-count").style.display = "flex";
    document.querySelector(".red-light-count").style.display = "none";
  } else if (selectedInput === "red light") {
    loadRedLightCams(e);
    document.querySelector(".red-light-count").style.display = "flex";
    document.querySelector(".speed-camera-count").style.display = "none";
   } else if (selectedInput === "police stations") {
      loadPoliceStations(e);
  } else {
    loadBoth(e);
    document.querySelector(".red-light-count").style.display = "flex";
    document.querySelector(".speed-camera-count").style.display = "flex";
  }
});
document.querySelector(".input-field").addEventListener("change", e => {
  selectedInput = e.target.value;
});
