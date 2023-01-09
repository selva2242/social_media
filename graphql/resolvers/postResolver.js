const { AuthenticationError } = require('apollo-server');

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
                    createdAt: new Date().toISOString()
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
                console.log(user);
                const existingPost = await Post.findById(postId);
                console.log(existingPost);

                if(existingPost){
                    if(existingPost.userName !== user.userName){
                        throw new AuthenticationError('You cannot delete others post');
                    }
                    console.log("existingPost before delete");

                    await existingPost.delete();                  
                      console.log("existingPost after delete");

                    return "Post Deleted successfully";
                } 
            } catch(err){
                throw new Error(err);
            }
        }
    }
}