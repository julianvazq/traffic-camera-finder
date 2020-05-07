/* Code for initializting the map */
/* code provided by the leaflet quickguide */
/* coordinates here are for Joint Base Andrews in PG County */
let mymap = L.map('map').setView([38.7965, -76.8836], 10);

const testudo = L.icon({
  iconUrl: '../icons/testudo.png',
  iconSize: [50, 55],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
  }
).addTo(mymap);
/* testing some generic pop up and location */
/* coordinates are set to UMD at the moment */
var layer1 = L.layerGroup().addTo(mymap);
let umd_mark = L.marker([38.987502, -76.942683], { icon: testudo }).addTo(
  mymap
);
umd_mark.bindPopup('<b>University of Maryland</b>').openPopup();
umd_mark.addTo(layer1);

function loadSpeedCams(e) {
  e.preventDefault();
  fetch('/api/speed')
    .then((res) => res.json())
    .then((res) => {
      console.log('Speed Cameras array: ', res); // logging step to check what we got
      return res;
    })
    .then((res) => {
      mapSpeedData(res);
      return res;
    })
    .then((res) => displaySummary(res));
}

function loadRedLightCams(e) {
  e.preventDefault();
  fetch('/api/redlight')
    .then((res) => res.json())
    .then((res) => {
      console.log('Red Light Cameras array: ', res); // logging step to check what we got
      return res;
    })
    .then((res) => {
      mapRedLightData(res);
      return res;
    })
    .then((res) => displaySummary(res));
}

function loadBoth(e) {
  e.preventDefault();

  // We clear the map here to avoid mapRedLightData clearing the speed cam icons
  layer1.clearLayers();

  // Clear display here for same reason as above
  document.querySelector('.summary').innerHTML = '';

  fetch('/api/speed')
    .then((resSpeed) => resSpeed.json())
    .then((resSpeed) => {
      console.log('Speed Cameras array: ', resSpeed); // logging step to check what we got
      return resSpeed;
    })
    .then((resSpeed) => {
      mapSpeedData(resSpeed, false);
      selectedInput = 'speed';
      return resSpeed;
    })
    .then((resSpeed) => displaySummary(resSpeed, false));

  fetch('/api/redlight')
    .then((resRedLight) => resRedLight.json())
    .then((resRedLight) => {
      console.log('Red Light Cameras array: ', resRedLight); // logging step to check what we got
      return resRedLight;
    })
    .then((resRedLight) => {
      mapRedLightData(resRedLight, false);
      selectedInput = 'red light';
      return resRedLight;
    })
    .then((resRedLight) => displaySummary(resRedLight, false));
}

function loadPoliceStations(e) {
  e.preventDefault();

  fetch('/api/police')
    .then((resPolice) => resPolice.json())
    .then((resPolice) => {
      console.log('Police stations array: ', resPolice); // logging step to check what we got
      return resPolice;
    })
    .then((resPolice) => {
      mapPoliceData(resPolice);
      return resPolice;
    })
    .then((resPolice) => displaySummary(resPolice));
}

function loadFireStations(e) {
  e.preventDefault();

  fetch('/api/fire')
    .then((resFire) => resFire.json())
    .then((resFire) => {
      console.log('Fire stations array: ', resFire); // logging step to check what we got
      return resFire;
    })
    .then((resFire) => {
      mapFireData(resFire);
      return resFire;
    })
    .then((resFire) => displaySummary(resFire));
}

const addNewIcon = async () => {
  const latitude = document.querySelector('input[name="latitude"]').value;
  const longitude = document.querySelector('input[name="longitude"]').value;
  const iconType = selectedInput;

  // console.log(iconType, latitude, longitude);

  const data = { iconType, latitude, longitude };
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/api/speed_post', options);
  const json = await response.json();
  console.log(json);

  let iconURL = '../icons/';
  if (selectedInput === 'red light') {
    iconURL += 'red-light-camera-icon.svg';
  } else if (selectedInput === 'speed and red light') {
    /*
  Will do in the future
   */
  } else if (selectedInput === 'police stations') {
    iconURL += 'police-station-icon.svg';
  } else if (selectedInput === 'fire stations') {
    iconURL += 'fire-station-icon.svg';
  } else {
    iconURL += 'speed-camera-icon.svg';
  }

  const speedCamIcon = L.icon({
    iconUrl: iconURL,
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3],
  });

  newMarker = L.marker([latitude, longitude], {
    icon: speedCamIcon,
  }).addTo(mymap);
  newMarker.bindPopup(`<b>${selectedInput.toUpperCase()}</b></br>`);
  newMarker.addTo(layer1);
};

const mapSpeedData = async (arg, clearMap = true) => {
  if (clearMap) {
    layer1.clearLayers();
  }

  const speedCamIcon = L.icon({
    iconUrl: '../icons/speed-camera-icon.svg',
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3],
  });

  /* loop that displays all of the map points as pop ups */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: speedCamIcon,
    }).addTo(mymap);
    umd_mark.bindPopup(
      '<b>Speed Camera</b></br>' +
        arg[i].street_address +
        '</br>' +
        '<b>Posted speed</b>: ' +
        arg[i].posted_speed +
        '</br>' +
        '<b>Enforced speed</b>: ' +
        arg[i].enforcement
    );
    umd_mark.addTo(layer1);
  }
};

const mapRedLightData = (arg, clearMap = true) => {
  if (clearMap) {
    layer1.clearLayers();
  }

  const redLightCamIcon = L.icon({
    iconUrl: '../icons/red-light-camera-icon.svg',
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3],
  });

  /* loop that displays all of the map points as markers */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: redLightCamIcon,
    }).addTo(mymap);
    umd_mark.bindPopup('<b>Red Light Camera</b></br>' + arg[i].street_address);
    umd_mark.addTo(layer1);
  }
};

const mapPoliceData = (arg) => {
  layer1.clearLayers();

  const policeIcon = L.icon({
    iconUrl: '../icons/police-station-icon.svg',
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3],
  });

  /* loop that displays all of the map points as markers */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: policeIcon,
    }).addTo(mymap);
    umd_mark.bindPopup(
      '<b>Police Station</b></br>' +
        '<b>Station name</b>: ' +
        arg[i].name +
        '</br>' +
        '<b>Telephone:</b>: ' +
        arg[i].telephone
    );
    umd_mark.addTo(layer1);
  }
};

const mapFireData = (arg) => {
  layer1.clearLayers();

  const fireIcon = L.icon({
    iconUrl: '../icons/fire-station-icon.svg',
    iconSize: [30, 70],
    iconAnchor: [25, 25],
    popupAnchor: [-10, -3],
  });

  /* loop that displays all of the map points as markers */
  for (let i = 0; i < arg.length; i += 1) {
    umd_mark = L.marker([arg[i].latitude, arg[i].longitude], {
      icon: fireIcon,
    }).addTo(mymap);
    umd_mark.bindPopup(
      '<b>Fire Station</b></br>' +
        '<b>Station number</b>: ' +
        arg[i].station_number +
        '</br>' +
        '<b>Station name</b>: ' +
        arg[i].name +
        '</br>' +
        '<b>Medical unit</b>: ' +
        arg[i].medical_unit_onsite +
        '</br>' +
        '<b>Ambulance</b>: ' +
        arg[i].ambulance_onsite
    );
    umd_mark.addTo(layer1);
  }
};

function displaySummary(objArray, clearSummary = true) {
  const summaryDiv = document.querySelector('.summary');

  if (clearSummary) {
    summaryDiv.innerHTML = '';
  }

  let summaryTitle = '';
  let listItems = [];

  // Display SPEED CAMERA summary
  if (selectedInput === 'speed') {
    summaryTitle = 'Speed Cameras';
    listItems = objArray.map(
      (cam) =>
        `<li><div><span class="bold">${cam.street_address}</span class="bold"></div><div><span class="bold">Posted speed</span>: ${cam.posted_speed}</div><div><span class="bold">Enforced speed</span>: ${cam.enforcement}</div></li>`
    );
  }
  // Display RED LIGHT CAMERA summary
  else if (selectedInput === 'red light') {
    summaryTitle = 'Red Light Cameras';
    listItems = objArray.map(
      (cam) =>
        `<li style="justify-content:center"><div><span class="bold">${cam.street_address}</span></div></li>`
    );
  }
  // Display POLICE STATIONS summary
  else if (selectedInput === 'police stations') {
    summaryTitle = 'Police Stations';
    listItems = objArray.map(
      (station) =>
        `<li style="justify-content:space-evenly"><div><span class="bold">Station name</span>: ${station.name}</div><div><span class="bold">Telephone</span>: ${station.telephone}</div></li>`
    );
  }

  // Display FIRE STATIONS summary
  else if (selectedInput === 'fire stations') {
    summaryTitle = 'Fire Stations';
    listItems = objArray.map(
      (f_station) =>
        `<li style="justify-content:space-evenly"><div><span class="bold">Station number</span>: ${
          f_station.station_number ? f_station.station_number : '-'
        }</div><div><span class="bold">Station name</span>: ${
          f_station.name
        }</div>
        </div><div><span class="bold">Medical Unit</span>: ${
          f_station.medical_unit_onsite === 'Y' ? 'Yes' : 'No'
        }</div><div><span class="bold">Ambulance</span>: ${
          f_station.ambulance_onsite === 'Y' ? 'Yes' : 'No'
        }</div></li>`
    );
  }

  // Update DOM
  summaryDiv.innerHTML += `
  <h2 class="list-title">${summaryTitle}</h2>
  <ul class="summary-list">${listItems.join('')}</ul>`;
}

let selectedInput = 'speed';

document.querySelector('.btn').addEventListener('click', (e) => {
  if (selectedInput === 'speed') {
    loadSpeedCams(e);
  } else if (selectedInput === 'red light') {
    loadRedLightCams(e);
  } else if (selectedInput === 'police stations') {
    loadPoliceStations(e);
  } else if (selectedInput === 'fire stations') {
    loadFireStations(e);
  } else {
    loadBoth(e);
  }
});
document.querySelector('.input-field').addEventListener('change', (e) => {
  selectedInput = e.target.value;

  document.querySelector('.add').disabled = false;
  document.querySelector('input[name="latitude"]').disabled = false;
  document.querySelector('input[name="longitude"]').disabled = false;
  /* Disabled adding speed/red light cameras when they're both selected (for now)
  /* because it's a more complex case than the others 
  /******************************************************************************/
  if (selectedInput === 'speed and red light') {
    document.querySelector('.add').disabled = true;
    document.querySelector('input[name="latitude"]').disabled = true;
    document.querySelector('input[name="longitude"]').disabled = true;
  }
  /******************************************************************************/
});

document.querySelector('.add').addEventListener('click', (e) => {
  e.preventDefault();
  addNewIcon();
});
