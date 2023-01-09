const { AuthenticationError } = require('apollo-server');
const post = require('../../models/post');

const Post = require('../../models/post');
const checkIsValidUser = require('../../utils/validateUser')
module.exports = {
    Query : {
        async getPosts(){
            return await Post.find();
        },
        async getPost(_, {postId}){
            try {
                const post = await Post.findById(postId);
                if (post) {
                  return post;
                } else {
                  throw new Error('Post not found');
                }
              } catch (err) {
                throw new Error(err);
              }
        }
    },
    Mutation : {
        async createPost(_, {body}, context){
            const user = checkIsValidUser(context);
            try{
                const newPost = new Post({
                    body,
                    user: user.id,
                    userName: user.userName,
                    createdAt: new Date().toISOString(),
                    comments : [],
                    likes : []
                });
    
                const post = await newPost.save();
    
                return post;
            } catch(err){
                throw new Error(err);

            }
            
        },
        async editPost(_, {postId, updatedBody}, context){
            try{
                const user = checkIsValidUser(context);
                const existingPost = await Post.findById(postId);
                if(existingPost){
                  
                  if(existingPost.userName !== user.userName){
                    throw new AuthenticationError('You cannot edit others post');
                  }
                  let updatedPost = existingPost;
                  updatedPost.body = updatedBody;
                  const updated = await updatedPost.save();           
                  return updated;
                } 
               
            } catch(err){
                throw new Error(err);
            }
        },
        async deletePost(_, {postId}, context){
            try{
                const user = checkIsValidUser(context);
                const existingPost = await Post.findById(postId);

                if(existingPost){
                    if(existingPost.userName !== user.userName){
                        throw new AuthenticationError('You cannot delete others post');
                    }

                    await existingPost.delete();                  

                    return "Post Deleted successfully";
                } 
            } catch(err){
                throw new Error(err);
            }
        },
        async likePost(_, {postId}, context){
            try{
                const user = checkIsValidUser(context);
                const existingPost = await Post.findById(postId);

                if(existingPost){
                    if(existingPost.likes.find((like)=> like.userName === user.userName)){
                        existingPost.likes = existingPost.likes.filter((like)=> like.userName !== user.userName);
                    }
                    else{
                        existingPost.likes.push({
                            userName : user.userName,
                            createdAt : new Date().toISOString()
                        })
                    }
                    await existingPost.save();

                    return existingPost;
                } 
            } catch(err){
                throw new Error(err);
            }
        }
    }
}