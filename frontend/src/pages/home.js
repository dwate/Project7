import React, {  Component } from 'react';
//import { useHistory } from "react-router-dom";

//import ReactDOM from 'react-dom'
//import { Component } from 'react';
import Axios from 'axios';




class Home extends Component {
  
  
  
 state = {
  loading: true,
   posts: [],
   
 }
          
 
  componentDidMount() {
    this.getAllPosts();
    
  }
     
        
    getAllPosts = () => {
      Axios.get('http://localhost:3001/articles/'
          ).then( (response) => this.setState({ posts: response.data.recordset}))
          .catch(err => console.log(err))
        }
          
        ArticleClicked = (event) => {
          event.preventDefault();
          const id = event.target.id;
         // console.log(id);
          
          this.props.history.push("/article/" + id);
        }      
          
        
         
        
             
     
     
 
      renderPosts = ({ ArticleID , Content , Title  }) => <div id="artItem" key={ArticleID}><div>{Title}</div><div id={ArticleID} onClick={this.ArticleClicked}>{Content}</div></div>
    
         render() {
          const { posts } = this.state;
         
         return (
            <div>
                <h1>Home</h1>
         <div id="artTest">
           {posts.map(this.renderPosts)}</div>
            </div>
                );

             }
    
                }

export default Home;