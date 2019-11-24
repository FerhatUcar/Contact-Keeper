import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactItem from './ContactItem';
// import Spinner from '../layout/Spinner';

// context
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    // initialize contact and access to all states
    const contactContext = useContext(ContactContext);
    const { contacts } = contactContext;

    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem contact={contact} key={contact.id} />
            ))}
        </Fragment>
    );
};

export default Contacts;

