const bcrypt = require("bcrypt");


app.post('/signup', (req, res) => {
    const Email = req.body.username;
    const Password = req.body.password;
  
    bcrypt.hash(Password, 10, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query(
        "INSERT INTO [User] (Email, Password) VALUES ('" + Email + "', '" + hash +"')",
       
        (err, result) => {
          console.log(err);
        }
      );
    });
  });


app.post('/login', (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;
  
    db.query(
      "SELECT * FROM [User] WHERE Email = '" + Email +"'",
      
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
          bcrypt.compare(Password, result[0].Password, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            } else {
              res.send({ message: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
  });