const { model, Schema} = require('mongoose');

const postSchema = Schema({
    body : String, 
    userName : String,
    createdAt : String, 
    comments : [
        {
            body : String, 
            userName : String,
            createdAt : String, 
        }
    ],
    likes : [
        {
            body : String, 
            userName : String,
            createdAt : String,
        }
    ], 
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users' 
    }
})

module.exports = model('posts', postSchema);