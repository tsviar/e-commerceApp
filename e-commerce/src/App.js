import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import Popper from 'popper.js';
// import bootstrap from 'bootstrap';
import '@popperjs/core'; // Edit here
import 'bootstrap/dist/js/bootstrap.bundle';

import logo from './logo.svg';
import './App.css';

import { WrapperDataManager } from "./stateProvider/DataManager";

import MainNavbar from "./views/MainNavbar";
import Home from "./views/Home";
import Admin from "./views/Admin";
import Stats from "./views/Stats";

const App = () => {
  return (
    <Router>
      <WrapperDataManager>

        <div  className="container-fluid">

          <MainNavbar />



          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> */}

            <div className="container-fluid">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/' component={Admin} />
                <Route exact path='/' component={Stats} />
              </Switch>
            </div>

          </header>

        </div>

       </WrapperDataManager>
    </Router>
  );
}

export default App;
