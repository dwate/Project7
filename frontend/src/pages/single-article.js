  import React, { Component } from 'react';
  import Axios from 'axios';
  import "../styles/single-article.css";
  import Navbar from '../components/navbar';
 
  class Article extends Component {
      constructor(props) {
        super(props);
        this.state = {
          articles: [],
          allComments: [],
          comment: '',
          pid: [],
          likes: false ,
          newLikes: false, 
          numberlikes: 0
        };

        this.handleChange = this.handleChange.bind(this);
      };

      componentDidMount() {
        this.getArticleByID();
        this.getCommentsForArticle();
        this.GetMyLike();
        this.NumberLike();
      };

      handleChange(event) { 
    
        const value =  event.target.value;
        const name = event.target.name; 
        this.setState({[name]: value});     
      };

      getArticleByID = () => {
        const { match: { params } } = this.props; 
        Axios.get(`http://localhost:3001/articles/${params.id}`  
          ).then((response) => this.setState({articles: response.data.recordset}))
          .catch(err => console.log(err))          
      }; 

      GetMyLike = () => {
        var pp = localStorage.getItem("pp");
        const { match: { params } } = this.props; 
          Axios.get(`http://localhost:3001/likes/${pp}/${params.id}`    
            ).then((response) => { if(response.data.recordset.length>0) {
              this.setState({likes: response.data.recordset[0].Liked}) 
            }else{
              this.setState({newLikes: true})
            }
          }).catch(err => console.log(err))       
      }; 

      NumberLike = () => {      
        const { match: { params } } = this.props; 
        Axios.get(`http://localhost:3001/likes/${params.id}`    
        ).then((response) => { 
            if(response.data.recordset.length>0) {
              this.setState({numberlikes: response.data.recordset[0].lnum});
            }else{
              console.log('empty');
              this.setState({numberlikes: 0});
            }
          }).catch(err => console.log(err))
      }; 




      addaLike = (event) => {
        event.preventDefault();        
        if (this.state.likes !== true) {
          this.setState({likes: true});
      
        } else if (this.state.likes !== false) {
          this.setState({likes: false});
        } else {
          console.log(this.state.likes); 
        } setTimeout(() => {this.postLike() }, 1000);
      };
      
      postLike = () => {
          if (this.state.newLikes=== true) {
            var pp = localStorage.getItem("pp"); 
            const { match: { params } } = this.props; 
            Axios.post(`http://localhost:3001/likes/` , { ArticleID: params.id , ProfileID: pp,  })
            .then ((response) => {
              console.log(response.data.message);
            }); this.NumberLike();
          } else {
            var ppid = localStorage.getItem("pp");             
            const liking = this.state.likes;
            console.log(liking);
            const { match: { params } } = this.props; 
            Axios.put(`http://localhost:3001/likes/${ppid}` , { ArticleID: params.id , ProfileID: ppid , likes: liking })
            .then ((response) => {
            console.log(response.data.message);
            });
          } this.NumberLike();
      };


      getCommentsForArticle = () => {
        const { match: { params } } = this.props; 
        Axios.get(`http://localhost:3001/comment/${params.id}`
          ).then( (response) => this.setState({ allComments: response.data.recordset}))
            .catch(err => console.log(err))
    
      };

      DeleteArticle = () => {
          const { match: { params } } = this.props;  
          Axios.delete(`http://localhost:3001/articles/${params.id}`  
          ).then((response) => console.log(response))
          .catch(err => console.log(err))
          this.props.history.push("/");
        
      };

      ModifyArticle = () => {
          const { match: { params } } = this.props; 
          this.props.history.push(`/modify-article/${params.id}`);
     
      };

      addComment = (event) => {
        event.preventDefault();
        var pp = localStorage.getItem("pp"); 
        var aa = localStorage.getItem("aa");
        const { match: { params } } = this.props; 
        Axios.post(`http://localhost:3001/comment/` , { ArticleID: params.id , ProfileID: pp, Content: this.state.comment, Name: aa })
        .then ((response) => {
          console.log(response.data.message);
          this.getCommentsForArticle();
        });

      };

      DeleteComment = (event) => {
        const id = event.target.id;
        Axios.delete(`http://localhost:3001/comment/${id}`  
        ).then((response) => console.log(response))
        .catch(err => console.log(err))

          this.getCommentsForArticle();
      };

      seenArticle = (event) => {
        event.preventDefault();
        var pp = localStorage.getItem("pp"); 
        
        const { match: { params } } = this.props; 
        Axios.post(`http://localhost:3001/viewed/` , { ArticleID: params.id , ProfileID: pp })
        .then ((response) => {
          console.log(response.data.message);
          this.getCommentsForArticle();
        });

      };
  

      renderPosts = ({ ArticleID , Content , Title , Likes , ContentImg, Author, ProfileID }, {  pp = localStorage.getItem("pp"), pid =parseInt(pp)} ) => 
          <div id="artSingle" key={ArticleID}>
            <h2>{Title}</h2> 
            <div id="editBn">
              <button className="editBn" disabled={ pid !== ProfileID ? true:false } onClick={this.ModifyArticle}>Edit</button>
              <button className="deleteBn" disabled={ pid !== ProfileID ? true:false } onClick={this.DeleteArticle}>Delete</button>
            </div>
            <img id={ContentImg} src={ContentImg} alt={Title} width="50%" height="auto"/>
            <div id={Content}>{Content}</div>
            <p>Content by {Author}</p>
            <div className="hideAll" id="hidden">{ProfileID}</div>
            <div>
              <div className="likingThumbs">
                <div className="likes">
                  <i className={`fas fa-thumbs-up ${this.state.likes ? "lthumb" : "dthumb"}`} onClick={this.addaLike} ></i>
                    <span className="likesTotal">{this.state.numberlikes}</span>
                </div>
              </div>
            </div>           
          </div>  

      renderComments = ({ ArticleID, Content, Name, ProfileID, CommentID }, {  pp = localStorage.getItem("pp"), pid =parseInt(pp)}) =>
          <div id={CommentID} className="comBubble" key={CommentID}>
            <div className="says">
              <button className="closeBn" id={CommentID} disabled={ pid !== ProfileID ?? true} onClick={this.DeleteComment}>x</button>
              <p>{Name} says... {Content} </p>
            </div>
            <div className="hideAll" id="hideID2">{CommentID}</div>
            
          </div>

      render() {
        const { articles } = this.state;
        const { allComments } =this.state;

        return (
          <div>
            <Navbar/>
            <br/>
            <div id="artInDepth">{articles.map(this.renderPosts)}</div>
            <div><button onClick={this.seenArticle}>Article Seen</button></div>
            <div id="comment section">{allComments.map(this.renderComments)}</div>
            <div id="commentBox">
              <form id="comBoxForm" onSubmit={this.addComment}>
              <textarea type="text" form="comBoxForm" id="textboxid" name="comment" cols="30" rows="7" onChange={this.handleChange}></textarea>
              <button type="submit" disabled={this.state.comment.length<1} >comment</button>
              </form>
             
            </div>
          </div>
        );
      };
  };

  export default Article