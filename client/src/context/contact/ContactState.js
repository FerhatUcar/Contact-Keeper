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
                type: 'professional'
            }, {
                id: 2,
                name: 'Kezban Karaca',
                email: 'karacakezban@outlook.com',
                phone: '0628843264',
                type: 'personal'
            }, {
                id: 3,
                name: 'Sinem Yilmaz',
                email: 'yilmazs@live.nl',
                phone: '0621712302',
                type: 'personal'
            }
        ],
        current: null,
        filtered: null
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
    const deleteContact = id => { dispatch({type: DELETE_CONTACT, payload: id })};

    // set current contact
    const setCurrent = contact => { dispatch({type: SET_CURRENT, payload: contact })};

    // Clear Current Contact
    const clearCurrent = () => { dispatch({ type: CLEAR_CURRENT })};

    // update contact
    const updateContact = contact => { dispatch({type: UPDATE_CONTACT, payload: contact })};

    // filter contact
    const filterContacts = text => { dispatch({type: FILTER_CONTACTS, payload: text })};

    // clear filter
    const clearFilter = () => { dispatch({type: CLEAR_FILTER })};

    return (
        <ContactContext.Provider
            // Anything that we want to be able to access
            // from other components including state and actions goes in value
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                // error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        > {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;

