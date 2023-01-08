const { gql } = require('graphql-tag')

module.exports = gql`
    type Post {
        id : ID!,
        body : String!,
        userName : String!, 
        createdAt : String!,
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
    }
    type Mutation {
        registerUser(registerInput : RegisterInput) : User!
        loginUser(email: String!, password: String!) : User!
    }
`