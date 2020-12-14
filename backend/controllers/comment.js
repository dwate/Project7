const msSql = require('mssql');
var moment = require('moment');
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

exports.getCommentbyArtId =  (req, res) => {
    const Artid = req.params.id;
    db.query("SELECT * FROM [Comment] WHERE (ArticleID) = "+Artid+";").then(
      (result) => {
        res.status(200).json(result);
      }
    ).catch(
      (error) => {
        res.status(404).json({error:error, message: 'Something went wrong'});
      }
    );  return msSql.close()
    };    


    exports.createComment =  (req, res) => {
        const ArticleID = req.body.ArticleID;
        const ProfileID = req.body.ProfileID;
        const CommentDate = moment().format('YYYY-MM-DD hh:mm:ss');
        const Content = req.body.Content; 
        const Name = req.body.Name;
      db.query("INSERT INTO [Comment] (ArticleID, ProfileID, Content, CommentDate, Name ) VALUES ('"+ArticleID+"' ,'" + ProfileID + "', '" + Content +"','" +CommentDate+ "','" +Name+ "')").then(
            () => {
              res.status(201).json({ message: "You have commented" });
            }
          ).catch((error) =>{
            res.status(400).json({error:error});
          }
          ); return msSql.close()
      }; 

exports.deleteComment =  (req, res) => {
    db.query("DELETE FROM [Comment] WHERE (CommentID) = "+req.params.id+";").then(
      () => {
        res.status(200).json({message: 'Comment deleted!'});
      }
    ).catch(
      (error) => {
        res.status(400).json({error:error, message: 'Unable to delete!!'});
      }
    );  return msSql.close()
   
    };    