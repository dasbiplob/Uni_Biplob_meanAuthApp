const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database')


// Register
router.post('/register',(req,res, next)=>{
let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg:'User Registered'});
            //return res.render(user);
        }

    });
});


// Authentication
// router.post('/authentication',async (req,res, next)=>{
//     const username = req.body.username;
//     const password = req.body.password;

//     User.getUserByName(username, (err, user) =>{
        
//         if(err) throw err;
//         if(!user){
//             return res.json({success: false, msg: 'User Not Found'})
//         }
//         User.comparePassword(password, user.password, (err, isMatch)=>{
//             if(err)throw err;
//             if(isMatch){
//                 const token = jwt.sign(user, config.secret, {
//                     expiresIn: 604800  // 1 Week
//                 });
//                 res.json({
//                     success: true,
//                     token: 'JWT '+token,
//                     user:{
//                         id: user._id,
//                         name: user.name,
//                         username: user.username,
//                         email: user.email
//                     }
//                 });
//             }else {
//                 return res.json({success: false, msg: 'Wrong Password'})
//             }
//         });
//     });
//     });

router.post('/authentication', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    try {
      const user = await User.getUserByName(username);
      if (!user) {
        return res.json({ success: false, msg: 'User Not Found' });
      }
  
      const isMatch = await User.comparePassword(password, user.password);
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800, // 1 Week
        });
  
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        return res.json({ success: false, msg: 'Wrong Password' });
      }
    } catch (err) {
      return res.json({ success: false, msg: 'Authentication Failed' });
    }
  });

// Profile
router.get('/profile',passport.authenticate('jwt', {session: false}),(req,res, next)=>{
    res.json[{user: req.user}];
    });

module.exports = router;
