import React, { useState } from 'react';
import Axios from 'axios';


function Profile() {
   
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [msg, setMsg] = useState("");

    const profileAdd = () => {
        Axios.put('http://localhost:3001/profile', +  {
            name: name,
            dob: dob,
            profileImg: profileImg,
            UserID: localStorage.getItem("userId"),
        }).then ((response) => {
            setMsg(response.data.message)
           // console.log(response.data.message);
        });
    };

      return (
            <div className="Profile">
                <h1>Profile</h1>
               
                <div className="input">
                    <label>Name</label>
                    <input type="text" id="Name" onChange={(e) => {
            setName(e.target.value);
          }}></input>
                </div>
                <div className="input">
                    <label>Date Of Birth</label>
                    <input type="date" placeholder="optional" id="dob" onChange={(e) => {
            setDob(e.target.value);
          }}></input>
                </div>
                <div className="input">
                    <label>Profile Image</label>
                    <input type="text" placeholder="optional" id="profileImg" onChange={(e) => {
            setProfileImg(e.target.value);}}>
            </input>
                </div>
                <div>
                   <button id="profileAdd" onClick={profileAdd}>Update</button> 
                </div>
        <h4>{msg}</h4> 
               
            </div>
        );
    }


export default Profile