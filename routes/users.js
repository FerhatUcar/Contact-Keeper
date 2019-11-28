const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Get the user model
const User = require('../models/User');


// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post('/', [
    check('name', 'Please add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // sends status message to the database
        return res.status(400).json({errors: errors.array()});
    }

    // Checks if the validation is passed
    res.send('passed');

    // tip: password is now plane text
    const { name, email, password } = req.body;

    try {
        // check if the user exists with that email
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({msg: 'User already exists'});

        // if the user doesn't exist, create a new user with the user model
        user = new User({name, email, password});

        // encrypts the password and gives a hash version of the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // saves the user on the database
        await user.save();
        res.send('User saved');

        const payload = { user: { id: user.id }};

        // creates json web token
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (err) {
        // logs the error on the console
        console.error(err.message);

        // sends status message to the database
        res.status(500).send('Server error');
    }
});

// export router
module.exports = router;
