const express = require('express');
const msSql = require('mssql');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//const articleRoutes = require('./routes/articles');
//const userRoutes = require('./routes/user');
const app = express();

app.use(express.json());
app.use(cors());

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
    console.log('MsSql is Connected!');
});


app.get ( '/articles', (req, res) => {
    db.query("SELECT * FROM [Articles];").then(
      (result) => {
        res.send(result);
      }
    ).catch(
      (error) => {
        res.status(500).send({ message: 'Something went wrong'});
      }
    );  return msSql.close()
    });  

    app.post('/signup', (req, res) => {
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
      });
    
    
    app.post('/login', (req, res) => {
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
                if (response) {
                //  req.session.user = result;
                //  console.log(req.session.User);
                  
                //  console.log(result.recordset[0].UserID);
                  const token = jwt.sign(
                    {userId: result.recordset[0].UserID },
                    'RANDOM_RANDOMNESS',
                    { expiresIn: '10h'});
                    res.send({userId: result.recordset[0].UserID, token: token });
                } else {
                  res.send({ message: "Wrong username/password combination!" });
                }
              });
            } else {
              res.send({ message: "User doesn't exist" });

            }
          }
        ); return msSql.close()
      });




app.listen(3001, () => {
    console.log("running on port 3001");
});