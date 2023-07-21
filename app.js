const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const config = require('./config/database')

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//Connect to DataBase
mongoose.connect(config.database,{
    useNewUrlParser: true,useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'+ config.database))
.catch(err => console.log(err))

// On Connection (OLD CODE -- Not Working)
// mongoose.connection.on('Connected',()=>{
//     console.log('Connected To DataBase' + config.database);
// });

// // To check the error in Mongoose
// mongoose.connection.on('Error',(error)=>{
//     console.log('Database Error' + error);
// });


const app = express();
const port = process.env.port || 3000;

const users = require('./routes/users.js'); 

//Cors Middleware
app.use(cors())

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser Middleware
app.use(bodyParser.json())

app.use('/users', users)


//Index routes
app.get('/',(req,res) =>{
    res.send("Welcome To MEAN Authentication Application")
})


//Start Server
app.listen(port,()=> {
    console.log(`Example app listening on port ${port}`)
}) 
