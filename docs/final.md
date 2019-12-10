# PG Finder

**Team members**: Julian Vazquez, Jake Susskind, Richard Teng and Romano

**Link to website**: https://pg-finder.herokuapp.com/

**Information problem**
Members of the PG County community do not have the information of where government properties are located in the area

**Stakeholders**
Members of PG County and individuals that are familiar with the area

**Target browsers**: Google Chrome, Microsoft Edge, Firefox, Safari, Opera

**Data we worked with**

- [Speed Cameras](https://data.princegeorgescountymd.gov/resource/mnkf-cu5c.json) - Street address, coordinates, posted and enforced speed
- [Red Light Cameras](https://data.princegeorgescountymd.gov/resource/3a3p-zwvz.json) - Location, coordinates
- [Police Stations](https://data.princegeorgescountymd.gov/resource/qkn8-5mhu.json) - Station name, coordinates, telephone and location
- [Fire Stations](https://data.princegeorgescountymd.gov/resource/bzf2-94qx.json) - Station number, station name, coordinates, medical unit and ambulance on site

**Stategies and Solutions**<br>
The proposed solution to our information problem is an interactive map that gives users the option to display the location and additional information for speed cameras, red light cameras, police stations and fire stations.

**Technical system decision rationale**<br>
The backend of the application is a server written in Node.js. Since we've been learning JavaScript for the past few months and got briefly introduced to Node.js, we thought this was a no-brainer.
For the frontend, we determined that the number of dynamic elements on our page were not enough to justify the use of a framework like React or Vue. We went with vanilla JavaScript and plain CSS, making good use of modern web development tools such as the fetch API for AJAX requests and Flexbox for layout structuring.

**How our system addresses the information problem**<br>
In the end, we think our system provides a solid solution to the information problem we choose to tackle. We built a user-friendly, repsonsive application that provides interesting information such as enforced speeds for traffic cameras and whether fire stations have a medical unit on site. We are aware that there are better mapping alternatives to our application, but at the same time we believe that these other applications do not provide the kind of detailed information that we do.

**Challenges faced and impact on final design**

- Port problem during the Heroku deploymente process. Changing the port constant to process.env.PORT fixed it (thanks Professor Leitch).
- We had some CSS issues (mostly when making it responsive) along the way, but that is to be expected when developing a website and we were able to fix them after some time spent on debugging.

**Possible future work**

- Add hospitals
- Add farmers markets
- Make summary list items clickable and make them redirect to their respective icon on the map
- Write tests
