const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const fetch = require("node-fetch");

const typeDefs = `
  type Todo {
    id: ID!
    title: String
    completed: Boolean
    userId: ID
  }
  type Query {
    hello: String
    getAllTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
  }   
  type User {
    id: ID!
    name: String
    username: String
    email: String
    website: String
    phone: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    getAllTodos: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      return response.json();
    },
    getAllUsers: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      return response.json();
    },
    getUser: async (_, { id }) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      return response.json();
    },
  },
};

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = 4000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

startServer();