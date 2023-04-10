import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { FilmsEntity } from 'src/films/entity/films.entity';
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
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule { }
