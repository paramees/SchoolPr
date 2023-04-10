import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './entity/films.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import { StarshipsEntity } from 'src/starships/entity/starships.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity]),
            TypeOrmModule.forFeature([SpeciesEntity]),
            TypeOrmModule.forFeature([VehiclesEntity]),
            TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PlanetsEntity])],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule { }
