import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsEntity } from './entity/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule { }
