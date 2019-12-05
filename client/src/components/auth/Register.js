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

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name, email, password
            })
        }
    };

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>

            <form onSubmit={onSubmit}>
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    variant="filled"
                    defaultValue={name}
                    onChange={onChange}

                    error={name === ""}
                    helperText={name === "" ? 'Required!' : ''}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    variant="filled"
                    defaultValue={email}
                    onChange={onChange}

                    error={email === ""}
                    helperText={email === "" ? 'Required!' : ''}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    defaultValue={password}
                    onChange={onChange}
                    required
                    minLength="6"

                    error={password === ""}
                    helperText={password === "" ? 'Required!' : ''}
                />
                <TextField
                    id="password2"
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    variant="filled"
                    defaultValue={password2}
                    onChange={onChange}
                    required
                    minLength="6"

                    error={
                        password2 === "" ||
                        password2 !== password
                    }
                    helperText={
                        password2 === "" ? 'Required!' : '' ||
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
