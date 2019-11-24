import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// css
import './App.css';

// components
import Navbar from "./components/layout/Navbar";
import Home from './components/pages/Home';
import About from './components/pages/About';

// state
import ContactState from "./context/contact/ContactState";


const App = () => {
    return (
        // access to our state with ContactState
        <ContactState>
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
        </ContactState>
    );
};

export default App;
