import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsEntity } from './entity/planets.entity';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetsEntity])],
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule { }
