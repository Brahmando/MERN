const express = require('express');
const submitFormRouter = express.Router();
const path = require('path');
const { contactForm } = require('../controllers/contactControl');


submitFormRouter.post('/submit-form',contactForm )

module.exports = submitFormRouter;