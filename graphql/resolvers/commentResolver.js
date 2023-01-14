const Post = require('../../models/post');
const checkIsValidUser = require('../../utils/validateUser')

module.exports = {
    Mutation : {
        async createComment(_,{postId, body}, context){
            const user = checkIsValidUser(context);

            const post = await Post.findById(postId);
            console.log(post)

            if(post){
                post.comments.unshift({
                    body : body,
                    createdAt : new Date().toISOString(),
                    username : user.username
                })
                await post.save();
                return post;
            } else{
                throw new Error('Post not found');
            }
        }, 
        async editComment(_,{postId, commentId, updatedBody}, context){
            const user = checkIsValidUser(context);

            const post = await Post.findById(postId);
            console.log(post)

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId);
                console.log("commentIndex ", commentIndex)
                if(commentIndex >=0){
                    if(post.comments[commentIndex].username !== user.username){
                        return new Error('You cannot edit other comment');
                    }
                    post.comments[commentIndex].body = updatedBody
                    await post.save();
                    return post;
                }
                throw new Error('Comment not found');
            } else{
                throw new Error('Post not found');
            }
        },
        async deleteComment(_,{postId, commentId}, context){
            const user = checkIsValidUser(context);

            const post = await Post.findById(postId);
            console.log(post)

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId);
                if(commentIndex >=0){
                    if(post.comments[commentIndex].username !== user.username){
                        return new Error('You cannot delete others comment');
                    }

                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                throw new Error('Comment not found');
            } else{
                throw new Error('Post not found');
            }
        }  
    }
}