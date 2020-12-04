import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import '../styles/navstyles.css'





class navbar extends Component {
   

    render() {
        return (
            <div>
                 <nav className="navList">
                <div>
            <span><Link className="navItem" to="/">Home</Link></span>
            <span><Link className="navItem" to="/signup">Signup</Link></span>
           <span><Link className="navItem" to="/login">Login</Link></span>
           <span><Link className="navItem" to="/create-article">Post</Link></span>
           <span><Link className="navItem" to="/profile">Profile</Link></span>
           <span><button id="logoff" >Logoff</button></span>
            </div>
            </nav>
            
            </div>
        )
    }
}

export default navbar