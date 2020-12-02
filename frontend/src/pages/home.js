//import React, { UseState } from 'react';
import Axios from 'axios';

function home() {
   

//const [myArticles, setMyArticles] = UseState('');

  const  getArticles = () => {
       Axios.get('http://localhost:3001/articles'
       ).then((response) =>{
          // console.log(response.data.recordset.length);
           var artData = (response.data.recordset);
           var artOutput = '';

        for(var i in artData){
            artOutput += '<div id="artItem">' +
            '<h2 class="artItemName">'+artData[i].Title+'</h2>' +
            '<p>' +artData[i].Content+ '</p></div>'
        }
        document.getElementById('artGroup').innerHTML = artOutput;
       });
    };
       
       
       /*.then (res => {
          console.log('No Articles')
        }) 
          //  setMyArticles('there are articles');
           // console.log(response.data.recordset[0].Email);
        .catch(err => console.log(err));

       
   }; */
   
   
   
   
    
        return (
            <div>
                <h1>Home</h1>
                <button id="temp" onClick={getArticles}>test</button>
        <h4>text</h4>
        <div id="artGroup"></div>
            </div>
        );
    }


export default home