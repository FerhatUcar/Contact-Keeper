import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/authContext";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const Setting = () => {
    const authContext = useContext(AuthContext);

    const { user, isAuthenticated } = authContext;

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const onChange = e => {

    };

    const onSubmit = e => {
        e.preventDefault();

        // saveUser(user);
    };

    // pull the variables from contact
    const { name, email, phone, type } = contact;

    return (
        <div className="contact-form">
            <form onSubmit={onSubmit}>
                <h2>Edit user</h2>

                <TextField
                    name="name"
                    label="Name"
                    type="text"
                    variant="filled"
                    value={name}
                    onChange={onChange}
                />

                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    value={email}
                    onChange={onChange}
                />

                <TextField
                    name="phone"
                    label="Phone"
                    type="phone"
                    variant="filled"
                    value={phone}
                    onChange={onChange}
                />

                <div className="contact-type">
                    <h4>Contact Type</h4>

                    <Checkbox
                        checked={type === 'personal'}
                        onChange={onChange}
                        name='type'
                        color="primary"
                        value="personal"
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />{' '} Personal{' '}

                    <Checkbox
                        checked={type === 'professional'}
                        onChange={onChange}
                        name='type'
                        color="primary"
                        type='radio'
                        value='professional'
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />{' '} Professional
                </div>

                <div>
                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                        className="btn__space--right"
                    >Update user
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Setting;
