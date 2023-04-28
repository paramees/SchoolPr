import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourseOptions } from '../db/data-sourse';
import { FilmsModule } from './entities/films/films.module';
import { PeopleModule } from './entities/people/people.module';
import { PlanetsModule } from './entities/planets/planets.module';
import { SpeciesModule } from './entities/species/species.module';
import { StarshipsModule } from './entities/starships/starships.module';
import { VehiclesModule } from './entities/vehicles/vehicles.module';
import { AuthModule } from './middleware/auth/auth.module';
import { UsersModule } from './middleware/users/users.module';



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
