import React, {  Component } from 'react';
import  "../styles/home.css";
import Axios from 'axios';
import Navbar from '../components/navbar';



class Home extends Component {
      constructor(props) {
        super(props);
        this.state = {
        loading: true,
        posts: [],
        viewed: []
        }
      };      
  componentDidMount() {
    this.getAllPosts();
    this.getMyViewed();
  };
    
  
        
        getAllPosts = () => {
          Axios.get('http://localhost:3001/articles/'
          ).then( (response) => this.setState({ posts: response.data.recordset}))
          .catch(err => console.log(err))
       
        };
          
        ArticleClicked = (event) => {
          event.preventDefault();
          const id = event.currentTarget.id;
          this.props.history.push("/article/" + id);
        };     
        
        getMyViewed = () => {
          var ppid =  localStorage.getItem("pp");
          Axios.get(`http://localhost:3001/viewed/${ppid}`
              ).then( (response) => this.setState({viewed: response.data.recordset}))
              .catch(err => console.log(err))
           
            };

     
      renderPosts = ({ ArticleID , Content , Title , ContentImg  }) => 
      <div className="artItem" id={ArticleID} onClick={this.ArticleClicked} key={ArticleID}>
        <div className="backLayer">{Title}</div>
        <img className="backLayer" id={ContentImg} src={ContentImg} alt="preview" width="auto" height="100px" />
        <div className="backLayer" id={Content}>{Content}</div>
        <br/>
        </div>
    
         render() {
          const { posts } = this.state;
         
          return (
            <div>
              <Navbar/>
              <div className="homeCenter">
                <h1>Home</h1>
              </div>
              <div id="artTest">{posts.map(this.renderPosts)}</div>
            </div>
          );

        };
    
  };

  export default Home;