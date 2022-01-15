const graphql = require('graphql');

module.exports = (resolvers, requireObject) => {
  const Person = requireObject('person');
  
  return new graphql.GraphQLObjectType({
    name: 'Cast',
    fields: {
      character: { type: graphql.GraphQLString },
      id: { type: graphql.GraphQLID },
      order: { type: graphql.GraphQLInt },
      person: { type: Person }
    },
  });
};