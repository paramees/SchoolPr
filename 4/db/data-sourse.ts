import { DataSourceOptions } from "typeorm";
import migrations from "./migrations"
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
    entities: ['src/**/*.entity.ts'],
    migrations: migrations
  }
   
  };


