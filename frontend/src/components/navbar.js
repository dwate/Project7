import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import Axios from 'axios';
import '../styles/navstyles.css'
import auth from './auth';




class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name: 'Profile',
        userId: ''
        };
    }

    componentDidMount() {

    
    }


    logoff = () => {
        localStorage.clear();
        delete Axios.defaults.headers.common['Authorization'];
       auth.loginCheck()
    }

    
   
    render() {
        const name = localStorage.getItem("aa");
     
        return (
            <div>
                 <nav className="navList">
                
            <span><Link className="navItem" to="/">Home</Link></span>
           <span><Link className="navItem" to="/create-article">Post</Link></span>
           <span><img className="navItemImg" src="http://localhost:3001/images/groupowhite.png" height="22px" alt="groupomania logo"/></span>
           <span><Link className="navItem" to="/my-profile/" >{name}</Link></span>
           <span><Link className="navItem" onClick={this.logoff} to="/login" >Logoff</Link></span>
            
            </nav>
            
            </div>
        )
     }
}

export default navbar