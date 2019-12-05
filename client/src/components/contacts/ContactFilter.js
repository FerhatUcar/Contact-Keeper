import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

import TextField from '@material-ui/core/TextField';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) text.current.value = '';
    });

    const onChange = e => {
        // get the actual value of the input
        // check if not equal to nothing
        if (text.current.value !== '') filterContacts(e.target.value);
        else clearFilter();
    };

    return (
        <form>
            <TextField
                id="filter"
                inputRef={text}
                type='text'
                variant="filled"
                name="filter"
                label='Filter Contacts...'
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;
