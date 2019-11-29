import React, { useState, useContext, useEffect, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

import Alert from "../../components/layout/Alert";


function validate(name, email, phone) {
    // true means invalid, so our conditions got reversed
    return {
        name: name.length === 0,
        email: email.length === 0,
        phone: phone.length === 0
    };
}


const ContactForm = () => {
    // initialize contact and access to all states
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    const [text, setText] = useState('');

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
    const onChange = e => {
        setContact({...contact, [e.target.name]: e.target.value});
    };

    // On Submit
    const onSubmit = e => {
        e.preventDefault();

        // show error message when form is incomplete
        if (inComplete || text === false) {
            alertContext.setAlert('Please enter text', 'danger');
            return false;
        }

        if (current === null) addContact(contact);
        else updateContact(contact);

        setText('');
        clearAll();
    };

    // clear all
    const clearAll = () => clearCurrent();


    const errors = validate(name, email, phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);


    return (
        <Fragment>
            <Alert />
            <form onSubmit={onSubmit}>
                <h2 className='text-primary'>
                    {current ? 'Edit Contact' : 'Add Contact'}
                </h2>
                <input
                    className={errors.name ? "error" : "success"}
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={onChange}
                />
                <input
                    className={errors.email ? "error" : "success"}
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={onChange}
                />
                <input
                    className={errors.phone ? "error" : "success"}
                    type='text'
                    placeholder='Phone'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                />
                <div className="contact-type">
                    <h4>Contact Type</h4>
                    <input
                        type='radio'
                        name='type'
                        value='personal'
                        checked={type === 'personal'}
                        onChange={onChange}
                    />{' '}
                    Personal{' '} <br/>
                    <input
                        type='radio'
                        name='type'
                        value='professional'
                        checked={type === 'professional'}
                        onChange={onChange}
                    />{' '}
                    Professional
                </div>

                <div>
                    <input
                        type='submit'
                        value={current ? 'Update Contact' : 'Add Contact'}
                        className='btn btn-primary btn-block btn__space--bottom'
                        disabled={isDisabled}
                    />
                </div>

                {current && (
                    <div>
                        <button className='btn btn-light btn-block' onClick={clearAll}>
                            Clear
                        </button>
                    </div>
                )}
            </form>
        </Fragment>
    );
};

export default ContactForm;
