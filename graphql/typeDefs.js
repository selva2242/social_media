const { gql } = require('graphql-tag')

module.exports = gql`
    type Post {
        id : ID!,
        body : String!,
        userName : String!, 
        createdAt : String!,
        comments : [Comment]!,
        likes : [Like]!,
        likesCount : Int!,
        commentsCount : Int!
    }
    type Comment {
        id : ID!,
        body : String!,
        userName : String!,
        createdAt : String
    }
    type Like{
        id : ID!,
        userName : String!,
        createdAt : String
    }
    type User{
        id: ID!,
        userName : String!,
        email : String!,
        token : String!
    }
    input RegisterInput {
        userName : String!,
        email : String!,
        password : String!,
        confirmPassword : String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation {
        registerUser(registerInput : RegisterInput) : User!
        loginUser(email: String!, password: String!) : User!
        createPost(body:String!) : Post!
        editPost(postId:String!, updatedBody: String!) : Post!
        deletePost(postId:String!) : String!
        createComment(postId:String!, body:String!) : Post!
        editComment(postId:String!, commentId:String!, updatedBody: String!) : Post!
        deleteComment(postId:String!, commentId:String!) : Post!
        likePost(postId:String!) : Post!
    }
`