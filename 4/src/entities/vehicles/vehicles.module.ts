import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { FilmsEntity } from '../films/entity/films.entity';
import { PeopleEntity } from '../people/entity/people.entity';
import { VehiclesEntity } from './entity/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';


@Module({
  imports: [TypeOrmModule.forFeature([VehiclesEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [VehiclesController],
  providers: [VehiclesService, ImagesService]
})
export class VehiclesModule { }
