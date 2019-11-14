function loadData() {
  console.log("fetch"); // confirm code is running on click
  fetch("/api")
    .then(res => res.json())
    .then(res => {
      console.log(res); // logging step to check what we got
      return res;
    });
}

/* Test */
// function loadDataTest() {
//   fetch("/api/test")
//     .then(res => res.json())
//     .then(res => (document.querySelector(".title").innerText = res));
// }

document.querySelector(".btn").addEventListener("click", loadData);
