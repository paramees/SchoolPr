import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesEntity } from './entity/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesEntity]),
            TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule { }
