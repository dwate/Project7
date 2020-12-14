  import React, { Component } from 'react';
  import Axios from 'axios';
  import Navbar from '../components/navbar';

  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {file: '', imagePreviewUrl: ''};
      this.state = {
        articles: [],
        selectedFile: null,
        Name: '',
        proStuff: ''
      };

      this.handleChange = this.handleChange.bind(this);
    

    };

    componentDidMount() {
        
    };

      handleChange(event) { 
    
      const value =  event.target.value;
      const name = event.target.name; 
      this.setState({[name]: value}); 
    
    };

    onFileChange = event => { 

      this.setState({ selectedFile: event.target.files[0] }); 
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({file: file, imagePreviewUrl: reader.result});
      }
      reader.readAsDataURL(file)
    }; 
    

    onFileUpload = (event) => {
      event.preventDefault();
      var uuID =  localStorage.getItem("userId");
      const profileInfo = {name: this.state.Name, dob: this.state.DOB, UserID: uuID };
      const formData = new FormData();
      formData.append('profile', JSON.stringify(profileInfo));
          if (this.state.selectedFile === null) {
            console.log('no profile pic');
          } else {
              formData.append("image",
              this.state.selectedFile, this.state.selectedFile.name );
          }
    
    Axios.post(`http://localhost:3001/profile/` , formData)
    .then((response) => {
      console.log(response.data.message);
       }).catch(err => console.log(err));
       setTimeout(() => {this.getProfileData() }, 1000);
    };

    getProfileData =() => {
      var useriden  = localStorage.getItem("userId");
      Axios.get(`http://localhost:3001/profile/${useriden}`  
      ).then((result) => {
        var proStuffN = result.data.name;
        var proStuffID = result.data.profileID;
        localStorage.setItem("aa", proStuffN );
        localStorage.setItem("pp", proStuffID );
      }).catch(err => console.log(err))
      localStorage.removeItem('NewUser');
      this.props.history.push(`/`);

    };

       
  render() {
  
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="preview" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for Preview</div>);
    }

      return (
        <div>
          <Navbar/>
          <h1>Profile</h1>
          <div>   
          <div className="Article">
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
                
              </div>
            </form>
          </div>
        </div>
        <div className="imgPreview">{$imagePreview}</div>
        </div>
      );
    }
  };

  export default Profile