import { Resolvers } from "../__generated__/graphql-server";

export const resolvers: Resolvers = {
  Query: {
    missions: async (_root, _args, { dataSources })  => {
      const results = await dataSources.db.getMissions();
      return results.map(({ id, mission, launch_date_time }) => {
        return {
          id,
          mission,
          launchDate: launch_date_time,
        };
      });
    },
  },
  Mission: {
    astronauts: async (root, _args, { dataSources }) => {
      const results = await dataSources.db.getAstronautsByMission(root.id);
      return results.map(({ id, first_name, last_name }) => {
        return {
          id,
          firstName: first_name,
          lastName: last_name,
        };
      });
    },
  },
};
