const Post = require('../../models/post');

module.exports = {
    Query : {
        async getPosts(){
            return await Post.find();
        }
    }
}