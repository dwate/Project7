import React, { Component } from 'react';
import Axios from 'axios';

class Article extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    
    };
  }

  componentDidMount() {
    this.getArticleByID();
    
}


 getArticleByID = () => {
    const { match: { params } } = this.props; 
     Axios.get(`http://localhost:3001/articles/${params.id}`  
      ).then((response) => this.setState({articles: response.data.recordset}))
      .catch(err => console.log(err))
 }

renderPosts = ({ ArticleID , Content , Title , Likes , Dislikes }) => <div id="artItem" key={ArticleID}><div>{Title}</div><div id={ArticleID}>{Content}</div><div><div>{Likes}</div>{Dislikes}<div></div></div></div>
  render() {
    const { articles } = this.state;
    return (
      <div>
        <h2>Articles</h2>
       <div id="artInDepth">{articles.map(this.renderPosts)}</div>
      </div>
    );
  }
}

export default Article