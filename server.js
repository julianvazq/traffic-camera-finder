const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
 * The 'express.static' middleware provides some services Express can use to
 * serve files from a directory - in this case, the 'public' subdirectory of
 * this project.
 *
 * The 'public' directory for this project, in turn, contains all the HTML,
 * Javascript, and CSS files needed to run a simple chat client connected to
 * this server. Accessing this server's root URL will serve 'public/index.html',
 * which contains our chat client. This gives users an easy way to connect to
 * the server and interact with other users.
 */

app.use(express.static("public"));

// Speed Cameras API endpoint: https://data.princegeorgescountymd.gov/resource/mnkf-cu5c.json
// Red Light Cameras API endpoint: https://data.princegeorgescountymd.gov/resource/3a3p-zwvz.json
// How to integrate with Google Maps: https://dev.socrata.com/blog/2014/05/31/google-maps.html

app.get("/api", (req, res) => {
  const baseURL = "https://api.umd.io/v0/bus/routes";
  fetch(baseURL)
    .then(r => r.json())
    .then(data => {
      console.log(data);
      res.send({ data: data });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

/* Test */
// app.get("/api/test", (req, res) => {
//   res.send([1, 2, 3, 4, 5]);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
