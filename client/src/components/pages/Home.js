import React, {useContext, useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from "../../context/auth/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    // will look at the token, hit the back-end,
    // validate it and puts the user in state
    // so when the page is loaded the user is still authenticated
    useEffect(() => {
        authContext.loadUser().then();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div className="card-section">
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
