const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')

const { MONGO_DB_CONNECT_URI } = require('./config')
const serverPort = 8000;

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

mongoose.connect(MONGO_DB_CONNECT_URI)
.then(() => {
    console.log(" MONGODB connected ")
    server.listen({ port : serverPort })
})
.then(() => console.log(`Server is up and runnning on port ${serverPort}`))