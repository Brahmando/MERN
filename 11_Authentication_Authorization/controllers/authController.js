const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.postSignUp = [
    // Validation checks
    body('firstname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name must contain only letters'),
    body('lastname')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name must contain only letters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^[A-Za-z0-9@#]+$/).withMessage('Password can only contain letters (A-Z, a-z), numbers (0-9), and @, #'),
    body('confirm_password')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    body('accountType')
        .notEmpty().withMessage('Account type is required')
        .isIn(['host', 'viewer']).withMessage('Invalid account type'),
    body('terms')
        .equals('agreed').withMessage('You must agree to the terms and conditions'),
    // Handle sign up
    async (req, res, next) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const { firstname, lastname, email, password, accountType, terms } = req.body;
            const oldValues={
                firstname,
                lastname,
                email,
                accountType
            }

            console.log('errors-', errors, errors.array())
            console.log('oldValues-',oldValues)
            return res.status(400).render('signUp', { emailXist: '',oldValues,error: errors.array()});
        }
        try {
            const { firstname, lastname, email, password, accountType, terms } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).render('signUp', { oldValues: [],emailXist: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user
            const user = new User({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                accountType,
                terms: terms === 'agreed'
            });

            await user.save();

            // Log the user in
            req.session.isLogged = true;
            req.session.user = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                accountType: user.accountType
            };

            res.redirect('/');
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).render('signUp', { emailXist: '',oldValues:[],error: error.message });
            }
            next(error);
        }
    }
];