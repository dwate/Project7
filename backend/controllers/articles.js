const msSql = require('mssql');
var moment = require('moment');
const fs = require('fs');

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
 // db.query("SELECT  FROM [Articles] INNER JOIN ;")
    db.query("SELECT * FROM [Articles] ORDER BY ArticleID DESC;").then(
      (result) => {
        res.status(200).json(result);
        //console.log(result);
      }
    ).catch(
      (error) => {
        res.status(400).json({error: error, message: 'Something went wrong'});
      }
    );  return msSql.close()
    };  
//
exports.createArticles =  (req, res) => {
  if (req.file){
    const url = req.protocol + '://' + req.get('host');
    var contentImg =  url + '/images/' + req.file.filename;
    req.body.article = JSON.parse(req.body.article);
  } else {
    req.body.article = JSON.parse(req.body.article);
    var contentImg = req.body.article.contentImg
  }
  const Title = req.body.article.title;
  const Content = req.body.article.content;
  const ArticleDate = moment().format('YYYY-MM-DD hh:mm:ss');
  const profileID = req.body.article.profileID;
  const author = req.body.article.author;
db.query("INSERT INTO [Articles] (ProfileID, Title, Content, ArticleDate, ContentImg, Author, Likes ) VALUES ('"+profileID+"' ,'" + Title + "', '" + Content +"','" +ArticleDate+ "', '" +contentImg+ "', '"+author+"', '0')",
      (err, result) => {
        console.log(err);
        res.status(201).send({ message: "Post Created Successfully!!!" });
      }
    ); return msSql.close()
  }; 

    exports.getArticleById =  (req, res) => {
     const Artid = req.params.id;
      db.query("SELECT * FROM [Articles] WHERE (ArticleID) = "+Artid+";").then(
      (result) => {
        res.status(200).send(result);
      }
      ).catch(
      (error) => {
        console.log(error);
        res.status(404).json({error:error, message: 'Something went wrong'});
          }
          );  return msSql.close()
      };    

    exports.modifyArticle =  (req, res) => {
         if (req.file){
            const url = req.protocol + '://' + req.get('host');
            var contentImg =  url + '/images/' + req.file.filename;
            console.log(req.body.article);
            req.body.article = JSON.parse(req.body.article);
         } else {
          req.body.article = JSON.parse(req.body.article);
          db.query("UPDATE [Articles] SET Title ='" +req.body.article.title+ "', Content ='" +req.body.article.content+ "' WHERE (ArticleID) = " +req.params.id+ ";").then(
             () => {
               res.status(201).json({message: 'Article has been updated'});
               }
              ).catch(
               (error) => {
                  res.status(400).json({error:error, message: 'Something went wrong'});
               }
              );  return msSql.close()
         }
         db.query("UPDATE [Articles] SET Title ='" +req.body.article.title+ "', Content ='" +req.body.article.content+ "', ContentImg ='" +contentImg+"' WHERE (ArticleID) = " +req.params.id+ ";").then(
          () => {
           res.status(201).json({message: 'Article has been updated'});
          }
          ).catch(
           (error) => {
           res.status(400).json({error:error, message: 'Something went wrong'});
           }
          );  return msSql.close()
      
    };


    exports.deleteArticle =  (req, res, next) => {
      db.query("SELECT ContentImg FROM [Articles] WHERE (ArticleID) = "+req.params.id+";").then(
        (result) => {
          
          const filename = result.recordset[0].ContentImg.split('/images/')[1];
          console.log(filename);
          fs.unlink('images/' + filename, () => {
            
      
             db.query("DELETE FROM [Articles] WHERE (ArticleID) = "+req.params.id+";").then(
               () => {
                res.status(200).json({message: 'Article deleted!'});
                  }
                 ).catch(
                 (error) => {
                   res.status(400).json({error:error, message: 'Unable to delete!!'});
                  }
               );  return msSql.close()
            });
          }
      );
      };    

      exports.getArticlesByUserId =  (req, res) => {
        const Artid = req.params.id;
         db.query("SELECT * FROM [Articles] WHERE (ProfileID) = "+Artid+" ORDER BY ArticleID DESC;").then(
         (result) => {
           res.status(200).send(result);
         }
         ).catch(
         (error) => {
           console.log(error);
           res.status(404).json({error:error, message: 'Something went wrong'});
             }
             );  return msSql.close()
         };    
