const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Get the Contact model
const Contact = require('../models/Contact');


// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, (req, res, next) => {
    Contact.find()
        .sort({ date: -1 })
        .exec()
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => {
            // logs the error on the console
           next(err);

            // sends status message to the database
            res.status(500).json({error: err})
        });
});


// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post('/', [auth, [
        check('name', 'Name is required')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            // put contact on the database
            const contact = await newContact.save();

            // return contact to the client
            await res.json(contact);

        } catch (err) {
            // logs the error on the console
            next(err);

            // sends status message to the database
            res.status(500).send('Server Error');
        }
    }
);


// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, (req, res, next) => {
    const {name, email, phone, type} = req.body;
    const id = req.params.id;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    Contact.updateOne({_id: id}, {$set: contactFields})
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => {
            next(err);
            res.status(500).json({error: err});
        });
});


// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, (req, res, next) => {
    const id = req.params.id;

    Contact.remove({ _id: id })
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => {
            next(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;
