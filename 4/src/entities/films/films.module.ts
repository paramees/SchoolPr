import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './entity/films.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { PeopleEntity } from 'src/entities/people/entity/people.entity';
import { SpeciesEntity } from 'src/entities/species/entity/species.entity';
import { VehiclesEntity } from 'src/entities/vehicles/entity/vehicles.entity';
import { StarshipsEntity } from 'src/entities/starships/entity/starships.entity';
import { PlanetsEntity } from 'src/entities/planets/entity/planets.entity';
import { ImagesService } from 'src/middleware/images_aws/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]),
            TypeOrmModule.forFeature([FilmsEntity]),
            TypeOrmModule.forFeature([SpeciesEntity]),
            TypeOrmModule.forFeature([VehiclesEntity]),
            TypeOrmModule.forFeature([StarshipsEntity]),
            TypeOrmModule.forFeature([PlanetsEntity])],
  controllers: [FilmsController],
  providers: [FilmsService, ImagesService]
})
export class FilmsModule { }
