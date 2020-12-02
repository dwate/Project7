//import React, { Component } from 'react';
import React, { useState } from 'react';
import Axios from 'axios';

  

 function Signup() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const register = () => {
        Axios.post('http://localhost:3001/signup', {
            email: email,
            password: password,
        }).then ((response) => {
            setMsg(response.data.message)
            console.log(response.data.message);
        });
    };
 
  
        return (
           
            <div className="signup">
                <h1>Signup</h1>
                <div className="input">
                    <label>Email</label>
                    <input type="text" id="email"  onChange={(e) => {
            setEmail(e.target.value);
          }}></input>
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="text" id="password"  onChange={(e) => {
            setPassword(e.target.value);
            }}></input>
                </div>
                <div>
                   <button id="signingup" onClick={register}>Submit</button> 

        <h4>{msg}</h4>
                </div>
            </div>
        );
    }

    export default Signup;




