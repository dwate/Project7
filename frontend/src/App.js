import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';

import Navbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={home}/>
            <Route exact path="/signup" component={signup}/>
            <Route exact path="/login" component={login}/>
          </Switch>
        </Router>    
      </div>
    );
  }
}  
   

export default App;
