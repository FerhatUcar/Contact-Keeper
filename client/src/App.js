import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// css
import './assets/App.scss';

// components
import Navbar from "./components/layout/Navbar";
import Home from './components/pages/Home';
import About from './components/pages/About';

// state
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";


const App = () => {
    return (
        // access to our state with ContactState
        <ContactState>
            <AlertState>
                <Router>
                    <Fragment>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={About} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </AlertState>
        </ContactState>
    );
};

export default App;
