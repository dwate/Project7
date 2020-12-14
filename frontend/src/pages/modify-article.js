  import React, { Component } from 'react';
  import Axios from 'axios';
  import Navbar from '../components/navbar';

  class ModifyArticle extends Component {
    constructor(props) {
      super(props);
      this.state = {file: '', imagePreviewUrl: ''};
      this.state = {
        articles: [],
        selectedFile: null

      };

      this.handleChange = this.handleChange.bind(this);
      this.artModify = this.artModify.bind(this); 

    };

    componentDidMount() {
      this.getArticleByID();
      
    };


    getArticleByID = () => {
      const { match: { params } } = this.props; 
      Axios.get(`http://localhost:3001/articles/${params.id}`  
        ).then((response) => this.setState({articles: response.data.recordset}))
        .catch(err => console.log(err))
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
      const articleBits = {title: this.state.title, content: this.state.content};
      const formData = new FormData();
       formData.append('article', JSON.stringify(articleBits));
        if (this.state.selectedFile === null) {
            console.log('no upload pic');
        } else {
            formData.append("image",
            this.state.selectedFile, this.state.selectedFile.name );
        }
        const { match: { params } } = this.props;
        Axios.put(`http://localhost:3001/articles/${params.id}` , formData).then 
        ((response) => {
        console.log(response.data.message);
          this.props.history.push(`/article/${params.id}`);
      });
    };



    renderPosts = ({ Content , Title, ArticleID , ContentImg  }) => 
          <div  key={ArticleID}> 
              <div className="Article">
                <form>
                  <div className="input">
                      <label htmlFor="title">Title</label>
                      <input id="title" name="title" type="text" defaultValue={Title}  onChange={this.handleChange || Title} required>
                      </input>
                  </div>
                  <div className="input">
                      <label htmlFor="content">Content</label>
                      <input id="content" type="text" name="content" defaultValue={Content} placeholder="optional" onChange={this.handleChange}>
                      </input>
                  </div>
                  <div className="input">
                      <label htmlFor="contentIMG">Content Image</label>
                      <input id="contentImg" type="file" name="contentImg" placeholder="optional"  onChange={this.onFileChange}>
                      </input><button onClick={this.onFileUpload}>upload</button>
                  
                  </div>
                  <div>
                    
                  </div>
                </form>
              </div>
            </div>
      render() {
        const { articles } = this.state;
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
          <h1>Edit Post</h1>
        <div id="artInDepth">{articles.map(this.renderPosts)}</div>
        <div className="imgPreview">{$imagePreview}</div>
        </div>
      );
    }
  }

  export default ModifyArticle