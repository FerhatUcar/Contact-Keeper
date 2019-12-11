import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case ADD_CONTACT:
            return {
                // get the current state
                ...state,

                // the state is immutable, so copy the state with contacts
                contacts: [action.payload, ...state.contacts],

                loading: false
            };
        case UPDATE_CONTACT:
            return {
                ...state,

                // map through all of the contacts
                // its going to look for the id the one that the payload has
                // if its matches its going to send the new updated contact and replace that with the current one
                // else its going to return whatever the original contact is
                contacts: state.contacts.map(contact =>
                    contact._id === action.payload._id ? action.payload : contact
                ),
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,

                // filter the contact from the UI
                contacts: state.contacts.filter(
                    contact => contact._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');

                    // match the name or email that is passed in
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
