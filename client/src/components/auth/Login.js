import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) props.history.push('/');

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;


    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            });
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>

                <TextField
                    id="email"
                    name="email"
                    label="Email Address *"
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
                    label="Password *"
                    type="password"
                    variant="filled"
                    defaultValue={password}
                    onChange={onChange}

                    error={password === ""}
                    helperText={password === "" ? 'Required!' : ''}
                />
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                >Login</Button>
            </form>
        </div>
    );
};

export default Login;
