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

exports.createProfile =  (req, res) => {
  if (req.file){
    const url = req.protocol + '://' + req.get('host');
    var profileImg =  url + '/images/' + req.file.filename;
    req.body.profile = JSON.parse(req.body.profile);
  } else {
          req.body.profile = JSON.parse(req.body.profile);
          const NameA = req.body.profile.name;
          const UserIDA = req.body.profile.UserID;
          db.query("INSERT INTO [Profile] (UserID, Name) VALUES ('" + UserIDA + "' , '" + NameA +"' )",
          (err, result) => {
           console.log(err);
            res.status(201).json({ message: "Profile Created Successfully!!!" });
            }
           ); return msSql.close()
  }  
    const Name = req.body.profile.name;
    const UserID = req.body.profile.UserID;
  
  db.query("INSERT INTO [Profile] (UserID, ProfileIMG, Name) VALUES ('" + UserID + "' ,'" + profileImg + "', '" + Name +"' )",
        (err, result) => {
          console.log(err);
          res.status(201).json({ message: "Profile Created Successfully!!!" });
        //  console.log(result);
        }
      ); return msSql.close()
    }; 

    exports.getProfileByUId =  (req, res) => {
      const UserId = req.params.id;
      db.query("SELECT * FROM [Profile] WHERE (UserID) = "+UserId+";").then(
        (result) => {
          res.status(200).json({profileID: result.recordset[0].ProfileID, name: result.recordset[0].Name, profileImg: result.recordset[0].ProfileIMG});
        }
      ).catch(
        (error) => {
          console.log(error);
          res.status(500).send({ message: 'Something went wrong'});
        }
      );  return msSql.close()
      };   

      exports.updateProfile =  (req, res) => {
        console.log(req.body.data);
        if (req.file){
          const url = req.protocol + '://' + req.get('host');
          var profileImg =  url + '/images/' + req.file.filename;
          console.log(req.body.profile);
          req.body.profile = JSON.parse(req.body.profile);
          
        } else {
              req.body.profile = JSON.parse(req.body.profile);
      
               db.query("UPDATE [Profile] SET Name= '" + req.body.profile.uname +"' WHERE (UserID) =" + req.params.id + ";" ).then(
                  (result) => {
                    res.status(201).json({ message: "Profile Created Successfully!!!" });
                  }
                  ).catch(
                    (error) => {
                      res.status(400).json({error:error, message:'something went wrong'});
                    }
                  ); return msSql.close()
                }      
        
        db.query("UPDATE [Profile] SET ProfileIMG='" + profileImg + "' , Name='" + req.body.profile.uname +"' WHERE (UserID) =" + req.params.id + ";" ).then(
          (result) => {
   
            res.status(201).json({ message: "Profile Created Successfully!!!" });
          //  console.log(result);
          }
        ).catch(
          (error) => {
             res.status(400).json({error:error, message: 'Something went wrong'}); 
            }
          ); return msSql.close()
        }; 