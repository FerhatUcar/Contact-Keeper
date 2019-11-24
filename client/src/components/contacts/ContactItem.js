import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    // initialize contact and access to all states
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    const { id, name, email, phone, type } = contact;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {id} - {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {/* Select the first letter and make it uppercase */}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (
                    <li>
                        <i className="fas fa-envelope-open" /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone" /> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </p>
        </div>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;
