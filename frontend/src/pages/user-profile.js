  import React, { Component } from 'react';
  import Axios from 'axios';
  import Navbar from '../components/navbar';
  import "../styles/user-profile.css";
  import auth from '../components/auth';

  class MyProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {file: '', imagePreviewUrl: ''};
      this.state = {
      
        selectedFile: null,
        Name: '',
        proStuff: '',
        NameFs: '',
        ProfileImgFs: '',
        articles: []
      };
      
      this.handleChange = this.handleChange.bind(this);
    }

      componentDidMount() {
      this.getProfileByID();
      this.getArticlesByUserID();
      };

      handleChange(event) { 
    
    const value =  event.target.value;
    const name = event.target.name; 
      this.setState({[name]: value}); 
    
    }

    getProfileByID = () => {
      const userId = localStorage.getItem("userId");
      Axios.get(`http://localhost:3001/profile/${userId}`  
        ).then((response) =>  this.setState({ NameFs: response.data.name, ProfileImgFs: response.data.profileImg}))
        .catch(err => console.log(err))
        
    }; 

    getArticlesByUserID = () => {
      const ppId = localStorage.getItem("pp");
      Axios.get(`http://localhost:3001/articles/user/${ppId}`  
        ).then((response) => this.setState({articles: response.data.recordset}))
        .catch(err => console.log(err))
        
    }; 

    onFileChange = event => { 
      
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
        this.setState({file: file, imagePreviewUrl: reader.result});
      }
      reader.readAsDataURL(file)
    } 
    

  onFileUpload = (event) => {
    event.preventDefault();
    var uuID =  localStorage.getItem("userId");
    const profileInfo = {uname: this.state.Name };
    const formData = new FormData();
    console.log(profileInfo);
    formData.append("profile", JSON.stringify(profileInfo));
        if (this.state.selectedFile === null) {
            console.log('no profile pic');
          } else {
                    formData.append("image",
                    this.state.selectedFile, this.state.selectedFile.name );
            }
    
    Axios.put(`http://localhost:3001/profile/${uuID}`, formData)
    .then((response) => {
      console.log(response.data.message);
      }).catch(err => console.log(err));
      
      this.getProfileByID();
    };

    DeleteUser = (event) => {
      var userID = localStorage.getItem("userId");
      Axios.delete(`http://localhost:3001/user/${userID}`  
      ).then((response) => console.log(response))
      .catch(err => console.log(err))
      localStorage.clear();
      delete Axios.defaults.headers.common['Authorization'];
        auth.loginCheck()
        this.props.history.push(`/`);
    };

    ArticleClicked = (event) => {
      event.preventDefault();
      const id = event.currentTarget.id;
      this.props.history.push("/article/" + id);
    };    


    renderPosts = ({ ArticleID , Content , Title , ContentImg  }) => 
    <div className="artItem" id={ArticleID} onClick={this.ArticleClicked} key={ArticleID}>
      <div className="backLayer">{Title}</div>
      <img className="backLayer" id={ContentImg} src={ContentImg} alt="preview" width="auto" height="100px" />
      <div className="backLayer" id={Content}>{Content}</div>
      </div>
  

          
  render() {
  
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="preview" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for Preview</div>);
    }
    let {ProfileImgFs, NameFs} = this.state;
    const { articles } = this.state;
      return (
        <div>
          <Navbar/>
          <br/>
          <br/>
          <div className="profileTop">
            <img className="proPic" src={ProfileImgFs} alt={NameFs} /><h1>{NameFs}</h1>
          </div>
          <hr/>
          <div>   
          <div className="Article">
            <h2>Update Profile</h2>
            <form>
              <div className="input">
                  <label htmlFor="Name">Name</label>
                  <input id="Name" name="Name" type="text"   onChange={this.handleChange} required>
                  </input>
              </div>
              <div className="input">
                  <label htmlFor="profileIMG">Profile Picture</label>
                  <input id="profileIMG" type="file" name="profileIMG" placeholder="optional" onChange={this.onFileChange}>
                  </input><button disabled={this.state.Name.length<1} onClick={this.onFileUpload}>upload</button>
              </div>
              <div>
              <div className="imgPreview">{$imagePreview}</div>
              </div>
            </form>
            <div class="navbar">  
            <div class="dropdown">
    <button class="dropbtn">Delete Profile 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
    <button className="deleteUser" onClick={this.DeleteUser}>Delete</button>
        </div>
    </div>
    </div>
          </div>
          <hr/>
          </div>
          
          <div>
          <div id="artTest">
          <h1>{NameFs}'s Post History</h1>
           {articles.map(this.renderPosts)}</div>
            </div>
      
        </div>
      );
    }
  }

  export default MyProfile