import { PeopleEntity } from "src/people/entity/people.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import migrations from "./migrations"
import { FilmsEntity } from "src/films/entity/films.entity";
import { StarshipsEntity } from "src/starships/entity/starships.entity";
import { SpeciesEntity } from "src/species/entity/species.entity";
import { VehiclesEntity } from "src/vehicles/entity/vehicles.entity";
import { PlanetsEntity } from "src/planets/entity/planets.entity";
import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

export const dataSourseOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: config.get('SQL_PORT'),
    username: config.get('SQL_USERNAME'),
    password: config.get('SQL_PASSWORD'),
    database: config.get('SQL_DATABASE'),
    entities: [PeopleEntity, FilmsEntity, StarshipsEntity, VehiclesEntity, SpeciesEntity, PlanetsEntity],
    migrations: migrations
  };

const dataSourse = new DataSource(dataSourseOptions);
export default dataSourse;