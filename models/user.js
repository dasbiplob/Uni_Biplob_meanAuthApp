const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

//User Schema

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const User = module.exports = mongoose.model('User', userSchema);

//Method for get the user by id
module.exports.getUserById = function (id, callback) {
    User.getUserById(id, callback);
}

//Method for get the user by name

module.exports.getUserByName = function (username, callback) {
    User.findOne()
}


module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(() => {
                    // Instead of rendering directly here, call the callback function
                    callback(null, "secrets");
                })
                .catch((err) => {
                    console.log(err);
                    // Pass the error to the callback, if needed
                    callback(err);
                });
        });
    });
}
