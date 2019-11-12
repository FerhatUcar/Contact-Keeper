// login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// Get the user model
const User = require('../models/User');


// @route       GET api/users
// @desc        Get logged in user
// @access      Private
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // sends status message to the database
        return res.status(400).json({errors: errors.array()});
    }

    // tip: password is now plane text
    const { email, password } = req.body;

    try {
        // check if there is no user with that email
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({msg: 'Invalid credentials'});


        // check if the plane password matches the stored password in the database
        // first parameter password: plane text that is passed in
        // second parameter password: the password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        // send the token
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


// @route       POST api/users
// @desc        Auth user & get token
// @access      Public
router.post('/', (req, res) => {
    res.send('Log in user');
});

// export router
module.exports = router;
