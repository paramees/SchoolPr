import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { FilmsEntity } from 'src/entities/films/entity/films.entity';
import { SpeciesEntity } from 'src/entities/species/entity/species.entity';
import { VehiclesEntity } from 'src/entities/vehicles/entity/vehicles.entity';
import { StarshipsEntity } from 'src/entities/starships/entity/starships.entity';
import { PlanetsEntity } from 'src/entities/planets/entity/planets.entity';
import { ImagesService } from 'src/middleware/images_aws/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity]),
            TypeOrmModule.forFeature([SpeciesEntity]),
            TypeOrmModule.forFeature([VehiclesEntity]),
            TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PlanetsEntity])],
  controllers: [PeopleController],
  providers: [PeopleService, ImagesService]
})
export class PeopleModule { }
