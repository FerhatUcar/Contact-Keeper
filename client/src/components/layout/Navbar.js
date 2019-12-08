import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/auth/authContext";


import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Navbar = ({ title, title2, icon }) => {
    const authContext = useContext(AuthContext);
    const { logout, user, isAuthenticated } = authContext;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => setAnchorEl(event.currentTarget);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        logout();
    };

    // check if there is a user
    // then put the users name in it
    const authLinks = (
        <Fragment>
            <li>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <i className="fas fa-user" />
                    <span className="navbar__name">{ user && user.name }</span>
                    <i className="fas fa-chevron-down"/>
                </Button>
            </li>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
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
                    <a onClick={onLogout} href="#!" className="menu-link">
                        <i className="fas fa-sign-out-alt" />
                        <span className="hide-sm">
                        Logout
                    </span>
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
                <i className={icon} /> {title} <span>{title2}</span>
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
    title: 'Contact',
    title2: 'Keeper',
    icon: 'fas fa-id-card-alt'
};

export default Navbar;
