const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const { body, validationResult } = require('express-validator');

exports.signup = [
    body('username')
        .trim()
        .isLength({ min: 2, max: 16 })
        .escape(),
    body('email', 'Email must be specified').trim().escape(),
    body('password').trim().isLength({ min: 8, max: 16 }).escape(),
    body('confirm-password').exists().isLength({ min: 8, max: 16 })
        .custom( async (value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords must be the same.')
        }),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({
                username: req.body.username,
                errors: errors.array(),
            });
        }

        try {
            const users = await User.find({ username: req.body.username });
            if (users.length > 0) return res.json({ message: 'User already exists!' });

            bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                if (err) return next(err);

                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPass
                }).save( err => {
                    if (err) return next(err);

                    res.json({
                        message: "Signed-up sucessfuly",
                        user: user,
                    });
                })


            });
        } catch (err) {
            return next(err);
        }
    }
];

exports.login = [
    body('username')
        .trim()
        .isLength({ min: 2, max: 16 })
        .escape(),
    body('password').trim().isLength({ min: 8, max: 16 }).escape(),
    async (req, res, next) => {
        passport.authenticate('local', { session: false }, async (err, user, info) => {
            if (err || !user) {
                const err = new Error('An errror occured.');
                return next(err);
            }

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);
            });
            
            const token = jwt.sign({ user }, process.env.SECRETKEY, {
                expiresIn: '1d',
            })

            return res.json({ user, token });
        })(req, res, next);
    }
];

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}