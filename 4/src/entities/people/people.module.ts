import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { FilmsEntity } from '../films/entity/films.entity';
import { PlanetsEntity } from '../planets/entity/planets.entity';
import { SpeciesEntity } from '../species/entity/species.entity';
import { StarshipsEntity } from '../starships/entity/starships.entity';
import { VehiclesEntity } from '../vehicles/entity/vehicles.entity';
import { PeopleEntity } from './entity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';


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
