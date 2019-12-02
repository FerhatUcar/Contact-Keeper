import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

// context
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    // initialize contact and access to all states
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

    useEffect(() => {
        // getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {contacts !== null ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(contact => (
                            <CSSTransition
                                key={contact.id}
                                timeout={500}
                                classNames='item'
                            >
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        ))
                        : contacts.map(contact => (
                            <CSSTransition
                                key={contact.id}
                                timeout={500}
                                classNames='item'
                            >
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default Contacts;

