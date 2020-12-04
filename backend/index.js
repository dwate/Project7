const express = require('express');
const msSql = require('mssql');
const cors = require('cors');
const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');

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

app.use('/articles', articleRoutes );
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);



app.listen(3001, () => {
    console.log("running on port 3001");
});