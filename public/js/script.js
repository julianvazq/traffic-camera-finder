function loadData() {
  console.log("fetch"); // confirm code is running on click
  fetch("/api")
    .then(res => res.json())
    .then(res => {
      console.log(res); // logging step to check what we got
      return res;
    });
}

document.querySelector(".btn").addEventListener("click", loadData);
