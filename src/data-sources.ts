import { SQLDataSource } from "datasource-sql";
import { DataSource } from 'apollo-datasource';

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './src/apollo.db',
    },
    useNullAsDefault: false
  }

class MyDatabase extends SQLDataSource {
    knex: any;
    constructor(config: any) {
      super(config);
    }
    getMissions() {
      return this.knex.select('*').from('missions');
    }
    getAstronautsByMission(mission_id: Number) {
      return this.knex.select('*').from('astronauts').join('mission_crew','astronauts.id','=','mission_crew.crew_id').where({
        mission_id: mission_id
      })
    }
  }
  

  export const dataSources = () => ({
    db: new MyDatabase(knexConfig) as DataSource
  })