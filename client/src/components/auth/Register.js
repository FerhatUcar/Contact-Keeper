import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;


    useEffect(() => {
        // redirect to the homepage if user is authenticated
        if (isAuthenticated) props.history.push('/');

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [errName, setErrName] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errPassword, setErrPassword] = useState(false);
    const [errPassword2, setErrPassword2] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = user;

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});

        const input = e.target.value;

        if (e.target.name === 'name') {
            if (input === '') setErrName(true);
            else setErrName(false);
        }

        if (e.target.name === 'email') {
            if (input === '') setErrEmail(true);
            else setErrEmail(false);
        }

        if (e.target.name === 'password') {
            if (input === '') setErrPassword(true);
            else setErrPassword(false);
        }

        if (e.target.name === 'password2') {
            if (input === '') setErrPassword2(true);
            else setErrPassword2(false);
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');

            if (name === '') setErrName(true);
            else setErrName(false);

            if (email === '') setErrEmail(true);
            else setErrEmail(false);

            if (password === '') setErrPassword(true);
            else setErrPassword(false);

            if (password2 === '') setErrPassword2(true);
            else setErrPassword2(false);

        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name, email, password
            })
        }
    };

    // when the user leaves the input without a value
    const onBlur = e => {
        const input = e.target.value;

        if (e.target.name === 'name') {
            if (input === '') setErrName(true);
            else setErrName(false);
        }

        if (e.target.name === 'email') {
            if (input === '') setErrEmail(true);
            else setErrEmail(false);
        }

        if (e.target.name === 'password') {
            if (input === '') setErrPassword(true);
            else setErrPassword(false);
        }

        if (e.target.name === 'password2') {
            if (input === '') setErrPassword2(true);
            else setErrPassword2(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>

            <form onSubmit={onSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    type="text"
                    variant="filled"
                    defaultValue={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errName}
                    helperText={errName ? 'Required!' : ''}
                />
                <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    variant="filled"
                    defaultValue={email}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errEmail}
                    helperText={errEmail ? 'Required!' : ''}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    defaultValue={password}
                    onChange={onChange}
                    onBlur={onBlur}
                    minLength="6"
                    error={errPassword}
                    helperText={errPassword ? 'Required!' : ''}
                />
                <TextField
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    variant="filled"
                    defaultValue={password2}
                    onChange={onChange}
                    onBlur={onBlur}
                    minLength="6"
                    error={errPassword2 || password2 !== password}
                    helperText={
                        errPassword2 ? 'Required!' : '' ||
                        password2 !== password ? 'Password doesnt match' : ''
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >Register</Button>
            </form>
        </div>
    );
};

export default Register;
