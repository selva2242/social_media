const { model, Schema } = require('mongoose');

const userSchema = Schema({
    username : String,
    email    : String, 
    password : String,
    createdAt : String
})

module.exports = model('user', userSchema)