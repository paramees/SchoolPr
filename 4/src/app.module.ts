import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourseOptions } from 'db/data-sourse';

import { UsersModule } from './middleware/users/users.module';
import { AuthModule } from './middleware/auth/auth.module';
import { FilmsModule } from './entities/films/films.module';
import { PeopleModule } from './entities/people/people.module';
import { PlanetsModule } from './entities/planets/planets.module';
import { SpeciesModule } from './entities/species/species.module';
import { StarshipsModule } from './entities/starships/starships.module';
import { VehiclesModule } from './entities/vehicles/vehicles.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourseOptions),
    PeopleModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
