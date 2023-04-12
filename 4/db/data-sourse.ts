import { PeopleEntity } from "src/people/entity/people.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import migrations from "./migrations"
import { FilmsEntity } from "src/films/entity/films.entity";
import { StarshipsEntity } from "src/starships/entity/starships.entity";
import { SpeciesEntity } from "src/species/entity/species.entity";
import { VehiclesEntity } from "src/vehicles/entity/vehicles.entity";
import { PlanetsEntity } from "src/planets/entity/planets.entity";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Config {

  constructor(private readonly configService: ConfigService) {}

  dataSourseOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: this.configService.get<number>('SQL_PORT'),
    username: this.configService.get<string>('SQL_USERNAME'),
    password: this.configService.get<string>('SQL_PASSWORD'),
    database: this.configService.get<string>('SQL_DATABASE'),
    entities: [PeopleEntity, FilmsEntity, StarshipsEntity, VehiclesEntity, SpeciesEntity, PlanetsEntity],
    migrations: migrations
  }
   
  };


