import { Resolvers } from "../../types/resolvers";

export const resolvers: Resolvers = {
  /**
   * Query-Resolvers for the `Mission` schema package
   */
  Query: {
    astronauts: async (_root, _args, { dataSources }) => {
      /**
       * Awaiting promise resolution from Knex
       */
      const results = await dataSources.db.getAstronauts();
      /**
       * Iterate through database results and format column names to schema
       */
      const response = results.map(({ id, first_name, last_name }) => {
        return {
          id,
          firstName: first_name,
          lastName: last_name,
        };
      });
      return response;
    },
  },
};
