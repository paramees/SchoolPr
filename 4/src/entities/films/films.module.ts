import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { PeopleEntity } from '../people/entity/people.entity';
import { PlanetsEntity } from '../planets/entity/planets.entity';
import { SpeciesEntity } from '../species/entity/species.entity';
import { StarshipsEntity } from '../starships/entity/starships.entity';
import { VehiclesEntity } from '../vehicles/entity/vehicles.entity';
import { FilmsEntity } from './entity/films.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';


@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity]),
            TypeOrmModule.forFeature([SpeciesEntity]),
            TypeOrmModule.forFeature([VehiclesEntity]),
            TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PlanetsEntity])],
  controllers: [FilmsController],
  providers: [FilmsService, ImagesService]
})
export class FilmsModule { }
