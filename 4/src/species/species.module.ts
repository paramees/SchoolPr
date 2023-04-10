import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesEntity } from './entity/Species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule { }
