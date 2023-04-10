import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsEntity } from './entity/planets.entity';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetsEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule { }
