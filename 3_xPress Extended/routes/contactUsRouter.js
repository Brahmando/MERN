const express = require('express');
const constactUsRouter = express.Router();
const path = require('path');


constactUsRouter.get('/contact-us', (req, res, next) => {
    console.log(`hello from Contact Us-${req.url},${req.method}`);
    res.sendFile(path.join(__dirname, '../views/contact-us.html'));
});

module.exports = constactUsRouter;
// This code defines a route for the "Contact Us" page of an Express application.