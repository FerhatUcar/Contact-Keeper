import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Navbar = ({ title, title2 }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { logout, user, isAuthenticated } = authContext;
    const { clearContacts } = contactContext;

    const [ anchorEl, setAnchorEl ] = useState(null);

    const handleClick = e => setAnchorEl(e.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const onLogout = () => {
        logout();
        clearContacts();
    };

    // check if there is a user
    // then put the users name in it
    const authLinks = (
        <Fragment>
            <li>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <i className="fas fa-user" />
                    <span className="navbar__name">
                        { user && user.name }
                    </span>
                    <i className="fas fa-chevron-down"/>
                </Button>
            </li>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/" className="menu-link">
                        <i className="fas fa-home" /> Home
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/about" className="menu-link">
                        <i className="fas fa-info-circle" /> About
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/settings" className="menu-link">
                        <i className="fas fa-cog" /> Settings
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <a onClick={onLogout} href="#!" className="menu-link">
                        <i className="fas fa-sign-out-alt" /> Logout
                    </a>
                </MenuItem>
            </Menu>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                {title} <span>{title2}</span>
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired
};

Navbar.defaultProps = {
    title: 'Contact',
    title2: 'Keeper'
};

export default Navbar;
