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
    const { setAlert } = alertContext;

    const [errName, setErrName] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errPhone, setErrPhone] = useState(false);

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

    // On Change
    const onChange = e => {
        setContact({...contact, [e.target.name]: e.target.value});
        const input = e.target.value;
        const name = e.target.name;

        switch (name) {
            case 'name':
                if (input.length === 0) setErrName(true);
                else setErrName(false);
                break;
            case 'email':
                if (input.length === 0) setErrEmail(true);
                else setErrEmail(false);
                break;
            case 'phone':
                if (input.length === 0) setErrPhone(true);
                else setErrPhone(false);
                break;
            default:
                return null;
        }
    };

    // On Submit
    const onSubmit = e => {
        e.preventDefault();

        // show error message when form is incomplete
        if (name.length === 0) {
            setErrName(true);
            setAlert('Please fill out the form', 'danger');
        } else if (email.length === 0) {
            setErrEmail(true);
            setAlert('Please fill out the form', 'danger');
        } else if (phone.length === 0) {
            setErrPhone(true);
            setAlert('Please fill out the form', 'danger');
        } else if (current === null) {
            addContact(contact);
            clearCurrent();
        } else {
            updateContact(contact);
            clearCurrent();
        }
    };

    return (
        <div className="contact-form">
            <form onSubmit={onSubmit}>
                <h2>{current ? 'Edit Contact' : 'Add Contact'}</h2>

                <TextField
                    name="name"
                    label="Name"
                    type="text"
                    variant="filled"
                    value={name}
                    onChange={onChange}
                    error={errName}
                    helperText={errName ? 'Required!' : ''}
                />

                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    value={email}
                    onChange={onChange}
                    error={errEmail}
                    helperText={errEmail ? 'Required!' : ''}
                />

                <TextField
                    name="phone"
                    label="Phone"
                    type="phone"
                    variant="filled"
                    value={phone}
                    onChange={onChange}
                    error={errPhone}
                    helperText={errPhone ? 'Required!' : ''}
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
                    />{' '} Personal{' '}

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
                    />{' '} Professional
                </div>

                <div>
                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                        className="btn__space--right"
                    >{current ? 'Update Contact' : 'Add Contact'}
                    </Button>

                    {current && (
                        <Button
                            onClick={clearCurrent}
                            variant="contained"
                            color="primary"
                        >Clear
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
