import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import AuthRoute from './components/AuthRoute';


import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import articleAdd from './pages/create-article';
import profile from './pages/profile';
import ModifyArticle from './pages/modify-article';
import article from './pages/single-article';
import MyProfile from './pages/user-profile';



class App extends Component {
 
  render() {
    return (
      <div className="App hero-image">
        <Router>
         
       
          <Switch>
            <Route exact path="/login" component={login}/>
            <Route exact path="/signup" component={signup}/>
            <AuthRoute exact path="/" component={home}  />
            <AuthRoute exact path="/profile" component={profile} />
            <AuthRoute exact path="/my-profile/" component={MyProfile} />
            <AuthRoute exact path="/create-article" component={articleAdd} />
            <AuthRoute exact path="/modify-article/:id" component={ModifyArticle} />
            <AuthRoute exact path="/article/:id" component={article}/>
            <Route path="*" component={()=> "404 PAGE NOT FOUND"}/>         
          </Switch>
        </Router>    
      </div>
    );
  }
}  
   

export default App;
