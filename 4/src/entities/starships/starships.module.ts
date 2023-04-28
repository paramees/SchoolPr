import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { FilmsEntity } from '../films/entity/films.entity';
import { PeopleEntity } from '../people/entity/people.entity';
import { StarshipsEntity } from './entity/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';


@Module({
  imports: [TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [StarshipsController],
  providers: [StarshipsService, ImagesService]
})
export class StarshipsModule { }
