const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Blog API.' });
});

router.post('/sign-up', userController.signup);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

module.exports = router;