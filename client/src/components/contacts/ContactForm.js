import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";

const ContactForm = () => {
    // initialize contact and access to all states
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    // pull the variables from contact
    const { name, email, phone, type } = contact;

    // check if form is incomplete
    const inComplete = email === '' || name === '' || phone === '';

    // On Change
    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    // On Submit
    const onSubmit = e => {
        e.preventDefault();

        // show error message when form is incomplete
        if (inComplete) {
            alertContext.setAlert('Please fill out the form', 'danger');
            return false;
        }

        if (current === null) addContact(contact);
        else updateContact(contact);

        clearAll();
    };

    // clear all
    const clearAll = () => clearCurrent();

    // const errors = validate(name, email, phone);

    return (
        <div className="contact-form">
            <form onSubmit={onSubmit}>
                <h2>{current ? 'Edit Contact' : 'Add Contact'}</h2>

                <TextField
                    name="name"
                    label="Name"
                    type="text"
                    variant="filled"
                    defaultValue={name}
                    onChange={onChange}
                />

                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    defaultValue={email}
                    onChange={onChange}
                />

                <TextField
                    name="phone"
                    label="Phone"
                    type="phone"
                    variant="filled"
                    defaultValue={phone}
                    onChange={onChange}
                />


                <div className="contact-type">
                    <h4>Contact Type</h4>

                    <Checkbox
                        checked={type === 'personal'}
                        onChange={onChange}
                        name='type'
                        color="primary"
                        value="personal"
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />{' '}
                    Personal{' '}

                    <br/>

                    <Checkbox
                        checked={type === 'professional'}
                        onChange={onChange}
                        name='type'
                        color="primary"
                        type='radio'
                        value='professional'
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />{' '}
                    Professional

                </div>

                <div>
                    <Button
                        type='submit'
                        value={current ? 'Update Contact' : 'Add Contact'}
                        variant="contained"
                        color="primary"
                    >Add Contact</Button>
                </div>

                {current && (
                    <div>
                        <button className='btn btn-light btn-block' onClick={clearAll}>
                            Clear
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
