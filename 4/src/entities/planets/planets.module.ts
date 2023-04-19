import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsEntity } from './entity/planets.entity';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PeopleEntity } from 'src/entities/people/entity/people.entity';
import { FilmsEntity } from 'src/entities/films/entity/films.entity';
import { ImagesService } from 'src/middleware/images_aws/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetsEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [PlanetsController],
  providers: [PlanetsService, ImagesService]
})
export class PlanetsModule { }
