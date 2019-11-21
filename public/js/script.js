let selectedInput = "speed";

function loadSpeedCams(e) {
  e.preventDefault();
  fetch("/api/speed")
    .then(res => res.json())
    .then(res => {
      console.log("Speed Cameras array: ", res); // logging step to check what we got
      return res;
    });
}

function loadRedLightCams(e) {
  e.preventDefault();
  fetch("/api/redlight")
    .then(res => res.json())
    .then(res => {
      console.log("Red Light Cameras array: ", res); // logging step to check what we got
      return res;
    });
}

function loadBoth(e) {
  e.preventDefault();

  fetch("/api/speed")
    .then(resSpeed => resSpeed.json())
    .then(resSpeed => 
      console.log("Speed Cameras array: ", resSpeed) // logging step to check what we got
    );
    
    fetch("/api/redlight")
    .then(resRedLight => resRedLight.json())
    .then(resRedLight => 
      console.log("Red Light Cameras array: ", resRedLight) // logging step to check what we got
    );

}

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
