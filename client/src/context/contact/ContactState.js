import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Ferhat Ucar',
                email: 'test@gmail.com',
                phone: '0628843263',
                type: 'personal'
            }, {
                id: 2,
                name: 'Kezban Karaca',
                email: 'test2@gmail.com',
                phone: '0628843264',
                type: 'personal'
            }, {
                id: 3,
                name: 'Feriban Karucar',
                email: 'test3@gmail.com',
                phone: '0628843265',
                type: 'professional'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // add contact
    const addContact = contact => {
        // get random id from uuid
        contact.id = uuid.v4();

        // dispatch to the reducer
        dispatch({type: ADD_CONTACT, payload: contact});

    };

    // delete contact

    // set current contact

    // clear current contact

    // update contact

    // filter contact

    // clear filter


    return (
        <ContactContext.Provider
            // Anything that we want to be able to access
            // from other components including state and actions
            // goes in value
            value={{
                contacts: state.contacts,
                // current: state.current,
                // filtered: state.filtered,
                // error: state.error,
            }}
        > {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;

