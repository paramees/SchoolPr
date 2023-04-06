import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclesEntity } from './entity/vehicles.entity';
import { createReadStream, unlink, ReadStream  } from 'fs';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesEntity)
    private vehiclesRepository: Repository<VehiclesEntity>,
  ) { }

  getLastTenVehicles(): Promise<VehiclesEntity[]> {
    return this.vehiclesRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  getVehiclesById(id: number): Promise<VehiclesEntity> | null {
    return this.vehiclesRepository.findOneBy({ id });
  }

  async addVehicles(vehicle: Partial<VehiclesEntity>): Promise<VehiclesEntity> {
    if (!vehicle.image_names) vehicle.image_names = [];
    return await this.vehiclesRepository.save(vehicle);
  }

  async removeVehiclesById(id: number): Promise<void> {
    await this.vehiclesRepository.delete(id);
  }

  async updateVehicles(id: number, vehicleUpd: Partial<VehiclesEntity>): Promise<VehiclesEntity> | null {
    let vehicle = await this.vehiclesRepository.findOneBy({ id });
    if (!vehicle) {
      return null;
    }
    Object.assign(vehicle, vehicleUpd);
    return this.vehiclesRepository.save(vehicle);
  }

  async addVehiclesImage(id: number, filenames: string[]): Promise<string | VehiclesEntity> {
    let vehicle = await this.vehiclesRepository.findOneBy({ id });
    if (!vehicle) {
      return "no vehicles with id: " + id;
    }
    filenames.forEach(el => vehicle.image_names.push(el));
    return await this.vehiclesRepository.save(vehicle);
  }

  async removeVehiclesImage(id: number, name: string): Promise<string | VehiclesEntity> {
    let vehicle = await this.vehiclesRepository.findOneBy({ id });
    if (!vehicle) {
      return "no vehicles with id: " + id;
    }
    vehicle.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.vehiclesRepository.save(vehicle);
  }

  async getVehiclesImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
