const postResolvers = require('./postResolver');
const usersResolvers = require('./userResolver')

module.exports = {
    Query : {
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
    },
}