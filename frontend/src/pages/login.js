import React, { useState } from 'react';
import Axios from 'axios';


function Login() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");
 
    const logon = () => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then ((response) => {
                if (response.data.message) {
                    setLoginStatus(response.data.message);
                } else {
                    setLoginStatus(response.data.recordset[0].Email);
                   // console.log(response.data.recordset[0].Email);
                }
            
        });
    };
 

      return (
            <div className="login">
                <h1>Login</h1>
               
                <div className="input">
                    <label>Email</label>
                    <input type="text" id="email" onChange={(e) => {
            setEmail(e.target.value);
          }}></input>
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="text" id="password" onChange={(e) => {
            setPassword(e.target.value);
          }}></input>
                </div>
                <div>
                   <button id="logon" onClick={logon}>Login</button> 
                </div>
        <h4>{loginStatus}</h4> 
               
            </div>
        );
    }


export default Login