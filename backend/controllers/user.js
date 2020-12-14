const msSql = require('mssql');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
   // console.log('MsSql is Connected!');
}); 

exports.signup = (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;
  
    bcrypt.hash(Password, 6, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query("INSERT INTO [User] (Email, Password) VALUES ('" + Email + "', '" + hash +"')",
       (err, result) => {
          console.log(err);
          res.json({ message: 'Sign up successful! Please Login to complete registration' });
        }
      );
    }); return msSql.close()
  };

    exports.login = (req, res) => {
    const Email = req.body.email;
    const loginPW = req.body.password;
  
    
    db.query("SELECT [User].[Email], [User].[Password], [User].[UserID], [Profile].[ProfileID], [Profile].[Name] FROM [User] LEFT JOIN [Profile] ON [User].[UserID] = [Profile].[UserID] WHERE Email = '" + Email +"'",
    (err, result) => {        
        if (err) {
          res.send({ err: err });
        }  
        if (result.recordset.length > 0) {
          bcrypt.compare(loginPW, result.recordset[0].Password, (error, response) => {
            let auth = false;
            if (response) {
              const token = jwt.sign(
                {userId: result.recordset[0].UserID },
                'RANDOM_RANDOMNESS',
                { expiresIn: '10h'});
                let auth = true;
                res.json({auth: auth, userId: result.recordset[0].UserID, profileID: result.recordset[0].ProfileID, name: result.recordset[0].Name, token: token });
            } else {
              
              res.json({auth: auth , message: "Wrong username/password combination!" });
            }
          });
        } else {
          let auth = false;
          res.json({ auth: auth, message: "User doesn't exist" });

        }
      }
    ); return msSql.close()
  };

  exports.deleteUser =  (req, res, next) => {
    db.query("SELECT ProfileImg FROM [Profile] WHERE (UserID) = "+req.params.id+";").then(
      (result) => {
        
        const filename = result.recordset[0].ProfileImg.split('/images/')[1];
        console.log(filename);
        fs.unlink('images/' + filename, () => {
          
    
           db.query("DELETE FROM [User] WHERE (UserID) = "+req.params.id+";").then(
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