const msSql = require('mssql');

const db = new msSql.ConnectionPool({
    
    user: 'groupodb',
    password: 'test123',
    server : 'localhost\\SQLEXPRESS',
    database: 'Groupomania'
});

db.connect((err) => {
    if(err){
        throw err;
    }
  //  console.log('MsSql is Connected!');
}); 

exports.getArticles =  (req, res) => {
    db.query("SELECT * FROM [Articles];").then(
      (result) => {
        res.json(result);
        //console.log(result);
      }
    ).catch(
      (error) => {
        res.status(500).send({ message: 'Something went wrong'});
      }
    );  return msSql.close()
    };  

exports.createArticles =  (req, res) => {
  const Title = req.body.title;
  const Content = req.body.Content;

db.query("INSERT INTO [Articles] (ProfileID, Title, Content) VALUES ('1' ,'" + Title + "', '" + Content +"')",
      (err, result) => {
        console.log(err);
        res.send({ message: "Post Created Successfully!!!" });
      }
    ); return msSql.close()
  }; 

  exports.getArticleById =  (req, res) => {
    const Artid = req.params.id;
    db.query("SELECT * FROM [Articles] WHERE (ArticleID) = "+Artid+";").then(
      (result) => {
        res.send(result);
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong'});
      }
    );  return msSql.close()
    };    

    exports.modifyArticle =  (req, res) => {
      db.query("UPDATE [Articles] SET Title ='" +req.body.title+ "', Content ='" +req.body.Content+ "' WHERE ArticleID = " +req.param.id+ ";").then(
        (result) => {
          res.send(result);
        }
      ).catch(
        (error) => {
          res.status(500).send({ message: 'Something went wrong'});
        }
      );  return msSql.close()
      };    



    exports.deleteArticle =  (req, res) => {
      db.query("DELETE * FROM [Articles] WHERE ArticleID = " +req.param.id+ ";").then(
        (result) => {
          res.send({message: 'Article deleted!'});
        }
      ).catch(
        (error) => {
          res.status(500).send({ message: 'Something went wrong'});
        }
      );  return msSql.close()
      };    
