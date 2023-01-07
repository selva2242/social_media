const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
    type Query {
        helloWorld: String!
    }
`

const resolvers = {
    Query : {
        helloWorld : () => "Welcome to the club"
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port : 3000 })
.then(() => console.log(`Server is up and runnning on port 3000`))