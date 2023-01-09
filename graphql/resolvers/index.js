const postResolvers = require('./postResolver');
const usersResolvers = require('./userResolver')
const commentResolvers = require('./commentResolver')

module.exports = {
    Query : {
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
}