import React, { Component } from 'react';
import { Link }  from 'react-router-dom';

import '../styles/navstyles.css'





class navbarB extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
     
    
    }



    render() {
        return (
            <div>
                 <nav className="navList">
               
                <span><img className="navItemImg" src="http://localhost:3001/images/groupowhite.png" height="22px" alt="groupomania logo"/></span>
                <span><Link className="navItem" to="/signup">Signup</Link></span>
                <span><Link className="navItem" to="/login">Login</Link></span>
           
            
            </nav>
            
            </div>
        )
    }
}

export default navbarB