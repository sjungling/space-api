import { SQLDataSource } from "datasource-sql";
import { DataSource } from "apollo-datasource";
import { join } from "path";

const databasePath = join(__dirname, "db", "apollo.sqlite3");
const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: databasePath,
  },
  useNullAsDefault: false,
};

class MyDatabase extends SQLDataSource {
  knex: any;
  constructor(config: any) {
    // console.info(`Loading data from ${databasePath}`);
    super(config);
  }
  getMissions() {
    return this.knex.select("*").from("missions");
  }
  getAstronautsByMission(mission_id: Number) {
    return this.knex
      .select("*")
      .from("crew")
      .join("mission_crew", "crew.id", "=", "mission_crew.crew_id")
      .where({
        mission_id: mission_id,
      });
  }
  getAstronauts() {
    return this.knex.select("*").from("crew");
  }
}

export const dataSources = () => ({
  db: new MyDatabase(knexConfig) as DataSource,
});
