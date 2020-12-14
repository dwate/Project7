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

}); 

exports.getMyLike =  (req, res) => {
    const ProfileId = req.params.pp;
    const ArticleID = req.params.id;
    //console.log( req.params.pp);
     db.query("SELECT Liked FROM [Likes] WHERE (ProfileID) = '"+ProfileId+"' AND ArticleID = '"+ArticleID+ "' ;").then(
     (result) => {
       res.status(200).json(result);
      }
      ).catch(
          (error) => {
            console.log(error);
            res.status(404).json({error:error, message: 'Something is wrong with my like'});
         }
      );  return msSql.close()
};    

exports.getArtLike =  (req, res) => {
  
  const ArticleID = req.params.id;
  //console.log( req.params.pp);
   db.query("SELECT COUNT(ArticleID) AS 'lnum' FROM [Likes] WHERE  ArticleID = '"+ArticleID+ "' AND Liked = 1;").then(
   (result) => {
     res.status(200).json(result);
    }
    ).catch(
        (error) => {
          console.log(error);
          res.status(404).json({error:error, message: 'Something is wrong with number of like'});
       }
    );  return msSql.close()
};    


     exports.createLike =  (req, res) => {
        const articleID = req.body.ArticleID;
        const profileID = req.body.ProfileID;
        
      db.query("INSERT INTO [Likes] (ProfileID, Liked, ArticleID ) VALUES ('"+profileID+"' ,'1', '" + articleID +"')",
            (err, result) => {
              console.log(err);
              res.status(201).send({ message: "you liked something!!!" });
            }
          );  return msSql.close()
        };  

        exports.modifyLike =  (req, res) => {
            const articleID = req.body.ArticleID;
            const profileID = req.body.ProfileID;
            const like = req.body.likes;
            
          db.query("UPDATE [Likes] SET Liked ='"+like+"' WHERE ProfileID = '"+profileID+"' AND ArticleID ='" + articleID +"';",
                (err, result) => {
                  console.log(err);
                  res.status(201).send({ message: "you changed your like!!!" });
                }
          );  return msSql.close()
        };  