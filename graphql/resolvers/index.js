const postResolvers = require('./postResolver');
const usersResolvers = require('./userResolver')
const commentResolvers = require('./commentResolver')

module.exports = {
    Post : {
        likesCount : (parent) => parent.likes.length,
        commentsCount : (parent) => parent.comments.length
    },
    Query : {
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
}