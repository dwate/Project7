import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import article from './pages/single-article';
import articleAdd from './pages/create-article';
import profile from './pages/profile';
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
            <Route exact path="/article/:id" component={article}/>
            <Route exact path="/profile" component={profile}/>
            <Route exact path="/create-article" component={articleAdd}/>
          </Switch>
        </Router>    
      </div>
    );
  }
}  
   

export default App;
