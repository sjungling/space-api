export const resolvers = {
  Query: {
    hello: async (_root, _args, { dataSources }) => {
      const astronaut = await dataSources.db.getAstronauts();
      const { first_name, last_name } = astronaut[0];
      return `Hello, World, ${first_name} ${last_name}`;
    },
  },
};
