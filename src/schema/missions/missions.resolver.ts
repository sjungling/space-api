import {
  Resolvers,
  Astronaut,
  Mission,
} from "../../__generated__/graphql-server";

export const resolvers: Resolvers = {
  /**
   * Query-Resolvers for the `Mission` schema package
   */
  Query: {
    missions: async (_root, _args, { dataSources }) => {
      /**
       * `results` and `response` are both defined to provide TypeScript
       * better visibility into the ultimate response object
       */
      const results = await dataSources.db.getMissions();
      const response: Array<Mission> = results.map(
        ({ id, mission, launch_date_time }): Mission => {
          return {
            id,
            mission,
            launchDate: launch_date_time,
          };
        }
      );
      return response;
    },
  },
  /**
   * Field-Resolvers for `Mission`
   */
  Mission: {
    astronauts: async (root, _args, { dataSources }) => {
      const results = await dataSources.db.getAstronautsByMission(root.id);
      const response: Array<Astronaut> = results.map(
        ({ id, first_name, last_name }): Astronaut => {
          return {
            id,
            firstName: first_name,
            lastName: last_name,
          };
        }
      );
      return response;
    },
  },
};
