const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { postSignUp } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.get('/login', (req, res, next) => {
    res.render('login');
});

authRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
            return res.status(400).render('login', { error: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).render('login', { error: 'Invalid email or password' });
        }

        req.session.isLogged = true;     //This is async operation
        req.session.user = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            accountType: user.accountType
        };
        req.session.save(err => {        // So save() is necessary
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    } catch (error) {
        next(error);
    }
});

authRouter.get('/signout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error destroying session');
        }
        res.redirect('/');
    });
});

authRouter.get('/signup', (req, res, next) => {
    res.render('signUp', {
        oldValues: [],
        emailXist: ''
    });
});

authRouter.post('/signup', postSignUp);

module.exports = authRouter;