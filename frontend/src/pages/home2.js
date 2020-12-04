
import Axios from 'axios';
import React, { useState } from 'react';

function Home() {


//const [articles, setPostData] = useState("");
var setPostData = []
//    function test(props) {
      //    const articles = props.articles;
       //   const allPosts = articles.map((posts) =>
      //    <div key={posts.toString()}>
       //     <h4>{posts.Title}</h4>
       //   </div>
       //   ); 
       //   return(
       //   <div>{allPosts}</div>
       //   );
       // };

          Axios.get('http://localhost:3001/articles/'
          ).then((response) => {
            if (response.data.message) {
            var  setPostData = (response.data.message);
              console.log(setPostData);
            } else {
              var setPostData2 = [];
              setPostData2 =(response.data.recordset);
              console.log(setPostData2);
            }
           // console.log(articles);
           }); 
           
         // ReactDOM.render(<test articles/>, document.getElementById('artTest'));
         
        
             
    return (
        <div>
          <h1>Home</h1>
          <div id="artTest">{setPostData.recordset.map(post => {
    return(
     <>
         <h4>{post.Title}</h4>
         <p>{post.Content}</p>
     </>
           )
         })
         }
       </div>
                 </div>
                );

           } 
    
                

export default Home