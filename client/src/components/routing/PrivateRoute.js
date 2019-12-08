import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { loading, isAuthenticated } = authContext;

    return (
        <div>
            {/* if the user is not authenticated and the user is done loading */}
            <Route
                {...rest}
                render={props => !isAuthenticated && !loading ? (
                    <Redirect to="/login/" />
                ):(
                    <Component {...props }/>
                )}
            />
        </div>
    );
};

export default PrivateRoute;
