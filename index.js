const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_DB_CONNECT_URI } = require('./config');
const resolvers = require('./graphql/resolvers/index');
const typeDefs  = require('./graphql/typeDefs')
const serverPort = 8000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req}) => ({req})
})

mongoose.connect(MONGO_DB_CONNECT_URI)
.then(() => {
    console.log(" MONGODB connected ")
    server.listen({ port : serverPort })
})
.then(() => console.log(`Server is up and runnning on port ${serverPort}`))