import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { FilmsEntity } from '../films/entity/films.entity';
import { PeopleEntity } from '../people/entity/people.entity';
import { PlanetsEntity } from './entity/planets.entity';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';


@Module({
  imports: [TypeOrmModule.forFeature([PlanetsEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [PlanetsController],
  providers: [PlanetsService, ImagesService]
})
export class PlanetsModule { }
