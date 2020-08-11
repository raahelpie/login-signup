import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Nav />
        <div className='container'>
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route
              exact
              path='/teacher-signup'
              render={(props) => <SignUp {...props} role='teacher' />}
            />
            <Route
              exact
              path='/student-signup'
              render={(props) => <SignUp {...props} role='student' />}
            />
          </Switch>{' '}
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
