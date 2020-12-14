    import React, { useState } from 'react';
    import Axios from 'axios';
    import { useHistory } from "react-router-dom";
    import NavbarB from '../components/navbarB';
    import '../styles/signup.css'


    function Signup() {
    
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const history = useHistory();

        const register = () => {
            Axios.post('http://localhost:3001/user/signup', {
                email: email,
                password: password
            }).then ((response) => {
                localStorage.setItem("NewUser", 'yes');
            alert(response.data.message);
            history.push("/login");
            });
        };
    
    
        return (
            
                <div className="signup">
                    <NavbarB/>
                    <div className="signForm">
                    <h1>Signup</h1>
                    <div className="input">
                        <label>Email</label>
                        <input type="email" id="email"  onChange={(e) => {
                setEmail(e.target.value);
            }}></input>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input type="password" id="password"  onChange={(e) => {
                setPassword(e.target.value);
                }}></input>
                    </div>
                    <div>
                    <button id="signingup" onClick={register}>Submit</button> 

        
                    </div>
                </div>
            </div>
            );
        }

        export default Signup;




