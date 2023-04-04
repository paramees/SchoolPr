import { PeopleEntity } from "src/people/entity/people.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import migrations from "./migrations"
import { FilmsEntity } from "src/films/entity/films.entity";
import { StarshipsEntity } from "src/starships/entity/starships.entity";

export const dataSourseOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "sqluser",
    password: "password",
    database: "star-wars",
    entities: [PeopleEntity, FilmsEntity, StarshipsEntity],
    synchronize: true, 
    migrations: migrations
  };

const dataSourse = new DataSource(dataSourseOptions);
export default dataSourse;