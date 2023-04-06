import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesEntity } from './entity/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesEntity])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule { }
