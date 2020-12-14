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

exports.getHaveIViewed =  (req, res) => {
    const ProfileId = req.params.pp;
    const ArticleID = req.params.id;
    //console.log( req.params.pp);
     db.query("SELECT * FROM [Viewed] WHERE (ProfileID) = '"+ProfileId+"' AND ArticleID = '"+ArticleID+ "' ;").then(
     (result) => {
       res.status(200).json(result);
      }
      ).catch(
          (error) => {
            console.log(error);
            res.status(404).json({error:error, message: 'Something is wrong'});
         }
      );  return msSql.close()
};    

exports.getAllViewed =  (req, res) => {
    const ProfileId = req.params.id;
    
    //console.log( req.params.pp);
     db.query("SELECT ArticleID FROM [Viewed] WHERE (ProfileID) = '"+ProfileId+"' ;").then(
     (result) => {
       res.status(200).json(result);
      }
      ).catch(
          (error) => {
            console.log(error);
            res.status(404).json({error:error, message: 'Something is wrong'});
         }
      );  return msSql.close()
};    



     exports.addViewed =  (req, res) => {
        const articleID = req.body.ArticleID;
        const profileID = req.body.ProfileID;
        
      db.query("INSERT INTO [Viewed] (ProfileID, seen, ArticleID ) VALUES ('"+profileID+"' ,'1', '" + articleID +"')",
            (err, result) => {
              console.log(err);
              res.status(201).send({ message: "you mark this article as viewed!!!" });
            }
          );  return msSql.close()
        };  

          