const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const config = require('./config/database')
const session = require('express-session');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//Connect to DataBase
mongoose.connect(config.database,{
    useNewUrlParser: true,useUnifiedTopology: true
}).then(() => console.log(`Connected to database ${config.database}`))
.catch(err => console.log(`Database error: ${err}`))

// On Connection (OLD CODE -- Not Working)
// mongoose.connection.on('Connected',()=>{
//     console.log('Connected To DataBase' + config.database);
// });

// // To check the error in Mongoose
// mongoose.connection.on('Error',(error)=>{
//     console.log('Database Error' + error);
// });


const app = express();
//const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;

const users = require('./routes/users.js'); 

//Cors Middleware
app.use(cors())

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser Middleware
app.use(bodyParser.json())

//Passport Middleware
app.use(session({secret : config.secret}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users)


//Index routes
app.get('/',(req,res) =>{
    res.send("Welcome To MEAN Authentication Application")
});

app.get('*',(req,res) =>{
res.sendFile(path.join(__dirname,'public/index.html'))
});

//Start Server
app.listen(port,()=> {
    console.log(`Example app listening on port ${port}`)
});
