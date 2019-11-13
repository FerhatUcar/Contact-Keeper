const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        });
        await res.json(contacts);
    } catch (err) {
        // logs the error on the console
        console.error(err.message);

        // sends status message to the database
        res.status(500).send('Server Error');
    }
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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

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
            res.json(contact);

        } catch (err) {
            // logs the error on the console
            console.error(er.message);

            // sends status message to the database
            res.status(500).send('Server Error');
        }
    }
);


// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // find contact by id with params.id
        // in the url: /:id
        let contact = await Contact.findById(req.params.id);

        // if the contact doesn't exist
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            // set the contactfields above
            { $set: contactFields },
            // if the contact doesn't exist, lets create it
            { new: true }
        );

        // update the contact in the client
        res.json(contact);

    } catch (err) {
        // logs the error on the console
        console.error(er.message);

        // sends status message to the database
        res.status(500).send('Server Error');
    }
});


// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Contact.findByIdAndRemove(req.params.id);

        await res.json({msg: 'Contact removed'});
    } catch (err) {
        // logs the error on the console
        console.error(err.message);

        // sends status message to the database
        res.status(500).send('Server Error');
    }
});

module.exports = router;
