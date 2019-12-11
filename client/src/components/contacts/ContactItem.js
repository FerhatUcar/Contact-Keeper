import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    // initialize contact and access to all states
    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    const { _id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className="card card__space bg-light">
            <h3 className="text-dark text-left">
                {name}{' '}
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

            <button className="btn btn__space--right btn-purple btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
            <button className="btn btn__space--right btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;

