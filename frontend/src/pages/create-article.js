  import React, { Component } from 'react';
  import Axios from 'axios';
  import Navbar from '../components/navbar';


  class CreateArticle extends Component {
    constructor(props) {
      super(props);
      this.state = {file: '', imagePreviewUrl: ''};
      this.state = {
        articles: [],
        selectedFile: null,
        title: ''
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
    var aa = localStorage.getItem("aa"); 
    var pp = localStorage.getItem("pp"); 
    const articleBits = {title: this.state.title, content: this.state.content, author: aa , profileID: pp, contentImg: 'null' };
    const formData = new FormData();
    formData.append('article', JSON.stringify(articleBits));
    if (this.state.selectedFile === null) {
      //console.log('non-image');
    } else {
    formData.append("image",
    this.state.selectedFile, this.state.selectedFile.name );
    }
    
    Axios.post(`http://localhost:3001/articles/` , formData)
    .then ((response) => {
      console.log(response.data.message);
      
      this.props.history.push(`/`);
  });
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
          <h1>Create a New Post</h1>
          <div>   
          <div className="Article">
            <form>
              <div className="input">
                  <label htmlFor="title">Title</label>
                  <input id="title" name="title" type="text" onChange={this.handleChange} required>
                  </input>
              </div>
              <div className="input">
                  <label htmlFor="content">Content</label>
                  <input id="content" type="text" name="content" placeholder="optional" onChange={this.handleChange}>
                  </input>
              </div>
              <div className="input">
                  <label htmlFor="contentIMG">Content Image</label>
                  <input id="contentImg" type="file" name="contentImg" placeholder="optional" onChange={this.onFileChange}>
                  </input><button disabled={this.state.title.length<1} onClick={this.onFileUpload}>upload</button>
              
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

  export default CreateArticle