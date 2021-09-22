const { gql, ApolloServer } = require("apollo-server");

const resolvers = {}

const typeDefs = gql``

const server = ApollorServer({
    typeDefs,
    resolvers
});

server.listen();