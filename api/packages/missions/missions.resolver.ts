import { Resolvers } from "../../types/resolvers";

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
      const response = results.map(
        ({
          id,
          mission,
          launch_date_time,
          cm_name,
          lm_name,
          launch_vehicle,
          remarks,
        }) => {
          return {
            id,
            mission,
            launchDate: launch_date_time,
            commandModule: cm_name === "N/A" ? null : cm_name,
            lunarModule: lm_name === "N/A" ? null : lm_name,
            launchVehicle: launch_vehicle,
            notes: remarks,
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
