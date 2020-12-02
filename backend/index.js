const express = require('express');
const msSql = require('mssql');
const cors = require('cors');
const bcrypt = require("bcrypt");

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



/* app.post('/signup', (req, res)=> {
    db.query("INSERT INTO [User] VALUES ('" + req.body.email + "','" + req.body.password + "')", 
    
     (error) => {        
    if (!error) {
        res.status(201).json({
            message: 'User saved successfully'
            
        });
    } else {
        res.status(401).json({
            message: error
        });
    }

  //  (err, result) => {
    //    console.log(err);
    }  
    ); return msSql.close()
});

app.post('/login', (req, res)=> {
    
    db.query("SELECT * FROM [User] WHERE Email = '" + req.body.email + "' AND Password = '" + req.body.password + "'", 
    
    (error, result) => { 
        if (error) {
            res.send({error: error});
            console.log('error');
        } 
        if (result.recordset.length >0) {                 
             res.send(result);
             } else {
                 res.send({ message: "Wrong Email/password!"})
             } 
        }
          
       
    ); return msSql.close()
}); */

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
                  res.send(result);
                } else {
                  res.send({ message: "Wrong username/password combination!" });
                }
              });
            } else {
              res.send({ message: "User doesn't exist" });
              console.log(loginPW);
              console.log(result.recordset[0].Password);
            }
          }
        ); return msSql.close()
      });




app.listen(3001, () => {
    console.log("running on port 3001");
});