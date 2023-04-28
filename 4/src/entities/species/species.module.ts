import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { FilmsEntity } from '../films/entity/films.entity';
import { PeopleEntity } from '../people/entity/people.entity';
import { SpeciesEntity } from './entity/species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';


@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [SpeciesController],
  providers: [SpeciesService, ImagesService]
})
export class SpeciesModule { }
