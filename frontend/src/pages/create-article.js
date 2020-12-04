import React, { useState } from 'react';
import Axios from 'axios';


function CreateArticle() {
   
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentImg, setContentImg] = useState("");
    const [msg, setMsg] = useState("");

    const articleAdd = () => {
        Axios.post('http://localhost:3001/articles', {
            title: title,
            content: content,
            contentImg: contentImg
        }).then ((response) => {
            setMsg(response.data.message)
           // console.log(response.data.message);
        });
    };

      return (
            <div className="Article">
                <h1>Create a Post</h1>
               
                <div className="input">
                    <label>Title</label>
                    <input type="text" id="Title" onChange={(e) => {
            setTitle(e.target.value);
          }}></input>
                </div>
                <div className="input">
                    <label>Content</label>
                    <input type="text" placeholder="optional" id="dob" onChange={(e) => {
            setContent(e.target.value);
          }}></input>
                </div>
                <div className="input">
                    <label>Content Image</label>
                    <input type="text" placeholder="optional" id="profileImg" onChange={(e) => {
            setContentImg(e.target.value);}}>
            </input>
                </div>
                <div>
                   <button id="profileAdd" onClick={articleAdd}>Post!</button> 
                </div>
        <h4>{msg}</h4> 
               
            </div>
        );
    }


export default CreateArticle