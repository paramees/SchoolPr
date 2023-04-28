import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'

import { FilmsEntity } from "../src/entities/films/entity/films.entity";
import { PeopleEntity } from "../src/entities/people/entity/people.entity";
import { PlanetsEntity } from "../src/entities/planets/entity/planets.entity";
import { SpeciesEntity } from "../src/entities/species/entity/species.entity";
import { StarshipsEntity } from "../src/entities/starships/entity/starships.entity";
import { VehiclesEntity } from "../src/entities/vehicles/entity/vehicles.entity";
import { UsersEntity } from "../src/middleware/users/entity/users.entity";

import migrations from "./migrations";

dotenv.config()


export const dataSourseOptions : DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: Number(process.env.SQL_PORT),
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    entities: [PeopleEntity, StarshipsEntity, VehiclesEntity, FilmsEntity, PlanetsEntity, SpeciesEntity, UsersEntity],
    migrations: migrations
}

export default new DataSource(dataSourseOptions);

