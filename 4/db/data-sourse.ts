import { PeopleEntity } from "src/people/entity/people.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import migrations from "./migrations"
import { FilmsEntity } from "src/films/entity/films.entity";
import { StarshipsEntity } from "src/starships/entity/starships.entity";
import { SpeciesEntity } from "src/species/entity/species.entity";
import { VehiclesEntity } from "src/vehicles/entity/vehicles.entity";
import { PlanetsEntity } from "src/planets/entity/planets.entity";

export const dataSourseOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "sqluser",
    password: "password",
    database: "star-wars",
    entities: [PeopleEntity, FilmsEntity, StarshipsEntity, VehiclesEntity, SpeciesEntity, PlanetsEntity],
    migrations: migrations
  };

const dataSourse = new DataSource(dataSourseOptions);
export default dataSourse;