import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesEntity } from './entity/Species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity])],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule { }
