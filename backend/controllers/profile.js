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
    const Name = req.body.Name;
    const DOB = req.body.dob;
    const profileIMG = req.body.profileImg;
    const UserID = req.body.UserID
  
  db.query("INSERT INTO [Profile] (UserID, ProfileIMG, Name, DOB) VALUES ('" + UserID + "' ,'" + profileIMG + "', '" + Name +"', '" + DOB + "' )",
        (err, result) => {
          console.log(err);
          res.send({ message: "Profile Created Successfully!!!" });
        }
      ); return msSql.close()
    }; 