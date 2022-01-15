
const graphql = require('graphql');

const { ApolloServer, gql } = require('apollo-server');
const moviesJson = require('./gql/objects/tmdb.json');


//const createApi = require('./api/tmdb');
//const createResolvers = require('./gql/resolvers');
//const createObjects = require('./gql/objects');
//const createSchema = require('./gql/createSchema');
//const createQueries = require('./gql/createQueries');

//const api = createApi();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Movie {
    title: String
    tagline: String
    poster_path: String
  }
  type Query {
    movies: [Movie]
  }
`;

const movies = [moviesJson];

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];


// Resolvers define the technique for fetching the types defined in the schema. 
//const resolvers = createResolvers(api);
const resolvers = {
  Query: {
    movies: () => movies,
  },
};

//const objects = createObjects(resolvers);

//const schema = createSchema(resolvers, objects);

//const typeDefs = objects;

//const queries = createQueries(schema);


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


//module.exports = queries;
