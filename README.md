# Name of the project

> "Name of the project"'s main objective is to give PG County residents quick access to information about different resources managed by the government, such as traffic cameras, fire and fire stations.'

**Link to Heroku**: ...

## Target Browsers

Any web browser that supports Flexbox, as specified by Can I Use: https://caniuse.com/#search=display%3A%20flex.
The site is responsive, so it should work on each respective browser's mobile version.

These include:

- Google Chrome
- Microsoft Edge
- Firefox
- Safari
- Opera

**Caveat**: even though Edge support Flexbox, it does not support the property "justify-content", causing the layout to not look as intended.

## Developer Manual

### Tech

- Node.js
- Vanilla JavaScript
- Plain CSS
- HTML
- Leaflet API

### Installation

##### Dependencies

"Name of the project" requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.

```sh
$ cd name of the project
$ npm install
$ npm start
```

#### Dev Dependencies

The only dev dependency is NodeMon. This automatically restarts the node application when a file change is detected, effectively eliminating the task of having to manually restart the server.

```sh
$ cd name of the project
$ npm install -D
$ npm run dev
```

### API Endpoints

#### Speed Cameras

| TYPE     | VALUE            |
| -------- | ---------------- |
| Endpoint | GET              |
| URL      | /api/speed       |
| Response | Array of objects |

**Example Response**

```sh
[
  {
    street_address: '13000 Laurel Bowie Road',
    posted_speed: '40',
    enforcement: '52',
    latitude: '39.104911',
    longitude: '-76.866641'
  },
  {
    street_address: '6360 Oxon Hill Road, Oxon Hill',
    posted_speed: '30',
    enforcement: '42',
    latitude: '38.80328',
    longitude: '-76.99046'
  }, ...
]
```

#### Red Light Cameras

| TYPE     | VALUE            |
| -------- | ---------------- |
| Endpoint | GET              |
| URL      | /api/redlight    |
| Response | Array of objects |

**Example Response**

```sh
[
  {
    street_address: 'Route 301 NB @ Pointer Ridge Drive',
    latitude: '38.909169',
    longitude: '-76.718058'
  },
  {
    street_address: 'Route 5/301 NB @ Cedarville Road',
    latitude: '38.665376',
    longitude: '-76.875035'
  }, ...
]
```

#### Police Stations

| TYPE     | VALUE            |
| -------- | ---------------- |
| Endpoint | GET              |
| URL      | /api/police      |
| Response | Array of objects |

**Example Response**

```sh
[
  {
    name: 'Communications',
    telephone: '301-499-8200',
    street_address: '{"address": "17321 Melford Blvd", "city": "Bowie", "state": "MD", "zip": ""}',
    latitude: '38.9581104',
    longitude: '-76.70426828'
  },
  {
    name: 'Clinton',
    telephone: '301-856-3130',
    street_address: '{"address": "6707 Groveton Dr", "city": "Clinton", "state": "MD", "zip": ""}',
    latitude: '38.73200663',
    longitude: '-76.89252333'
  }, ...
]
```

#### Fire Stations

| TYPE     | VALUE            |
| -------- | ---------------- |
| Endpoint | GET              |
| URL      | /api/fire        |
| Response | Array of objects |

**Example Response**

```sh
[
  {
    station_number: '801',
    name: 'HYATTSVILLE',
    street_address: '{"address": "6200 BELCREST RD", "city": "Hyattsville", "state": "MD", "zip": ""}',
    medical_unit_onsite: 'Y',
    ambulance_onsite: 'Y',
    latitude: '38.96384532',
    longitude: '-76.95262225'
  },
  {
    station_number: '805',
    name: 'CAPITOL HEIGHTS',
    street_address: '{"address": "6061 CENTRAL AVE", "city": "Gwynn Oak", "state": "MD", "zip": ""}',
    medical_unit_onsite: 'Y',
    ambulance_onsite: 'N',
    latitude: '38.88438585',
    longitude: '-76.91193696'
  }, ...
]
```
