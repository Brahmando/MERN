const express = require('express');
const homeRouter = express.Router();
const path = require('path');

homeRouter.get('/', (req, res, next) => {
    console.log(`hello from Home-${req.url},${req.method}`);
    res.sendFile(path.join(__dirname, '../views/home.html'));
}
);

module.exports = homeRouter;


// This code defines a route for the home page of an Express application.
// When a GET request is made to the root URL ('/'), it logs a message to the console and sends an HTML file as a response.
// The HTML file is located in the 'views' directory, specifically 'home.html'.
// The 'path' module is used to construct the file path, ensuring it works correctly across different operating systems.
// The router is exported so it can be used in the main application file (app.js) to handle requests to the home page.
// The code uses Express.js to create a router for handling requests to the home page of a web application.
// The router is set up to respond to GET requests at the root URL ('/') by sending an HTML file located in the 'views' directory.
// The 'path' module is used to ensure the correct file path is constructed, making the code portable across different operating systems.
// The router is exported so it can be used in the main application file (app.js) to handle requests to the home page.
// This code is part of an Express.js application that defines a route for the home page.
// When a GET request is made to the root URL ('/'), it logs a message to the console and sends an HTML file as a response.