const msSql = require('mssql');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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
  
      db.query(
        "INSERT INTO [User] (Email, Password) VALUES ('" + Email + "', '" + hash +"')",
       
        (err, result) => {
          console.log(err);
          res.send({ message: "Registration Success!!!" });
        }
      );
    }); return msSql.close()
  };





  exports.login = (req, res) => {
    const Email = req.body.email;
    const loginPW = req.body.password;
  
    db.query(
      "SELECT * FROM [User] WHERE Email = '" + Email +"'",
      
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
                res.json({auth: auth, userId: result.recordset[0].UserID, token: token });
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