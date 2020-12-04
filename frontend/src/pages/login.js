import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';


function Login() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    
    const history = useHistory();

    const logon = () => {
        Axios.post('http://localhost:3001/user/login', {
            email: email,
            password: password,
        }).then ((response) => {
                if (response.data.message) {
                    setLoginStatus(response.data.message);
                    console.log(response.data.auth);
                } else {
                    setLoginStatus(response.data.userId);
                    console.log(response.data.auth);
                    localStorage.setItem("auth-token", response.data.token);
                    localStorage.setItem("userId", response.data.userId );
                    history.push("/");
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