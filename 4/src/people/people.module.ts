import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule { }
