import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from 'db/data-sourse';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRoot(new Config(new ConfigService).dataSourseOptions),
    PeopleModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
