const express = require('express');
const constactUsRouter = express.Router();
const path = require('path');
const { contactController } = require('../controllers/homeControllers');


constactUsRouter.get('/contact-us', contactController);

module.exports = constactUsRouter;
// This code defines a route for the "Contact Us" page of an Express application.