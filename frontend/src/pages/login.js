    import React, { useState } from 'react';
    import { useHistory } from "react-router-dom";
    import Axios from 'axios';
    import auth from '../components/auth';
    import NavbarB from '../components/navbarB';
    import '../styles/login.css'

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
                } else {
                    setLoginStatus(response.data.userId);
                    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        localStorage.setItem("authtoken", response.data.token);
                        localStorage.setItem("userId", response.data.userId );
                        var newUser = localStorage.getItem("NewUser");
                        auth.loginCheck()
                        if (newUser === 'yes') {
                            history.push("/profile"); 
                        } else {
                            localStorage.setItem("aa", response.data.name );
                            localStorage.setItem("pp", response.data.profileID );    
                        history.push("/");
                        }
                        
                    
                }
                
            });
        };
    

        return (
            <div className="login">
                <NavbarB/>
                <div className="loginForm">
                    <h1>Login</h1>
                    <div className="input">
                        <label>Email</label>
                        <input type="email" id="email" onChange={(e) => {
                            setEmail(e.target.value);
                        }}></input>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input type="password" id="password" onChange={(e) => {
                            setPassword(e.target.value);
                        }}></input>
                    </div>
                    <div>
                        <button id="logon" onClick={logon}>Login</button> 
                    </div>
                    <h4>{loginStatus}</h4> 
                </div>
        </div>
            );
    };

    export default Login