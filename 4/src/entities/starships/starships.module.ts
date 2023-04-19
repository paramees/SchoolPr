import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsEntity } from './entity/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { PeopleEntity } from 'src/entities/people/entity/people.entity';
import { FilmsEntity } from 'src/entities/films/entity/films.entity';
import { ImagesService } from 'src/middleware/images_aws/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [StarshipsController],
  providers: [StarshipsService, ImagesService]
})
export class StarshipsModule { }
