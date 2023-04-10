import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclesEntity } from './entity/vehicles.entity';
import { createReadStream, unlink, ReadStream  } from 'fs';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesEntity)
    private vehiclesRepository: Repository<VehiclesEntity>,@InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(PeopleEntity)
    private pilotsRepository: Repository<PeopleEntity>,
  ) { }

  private relations = ['pilots', 'films'];

  getLastTenVehicles(): Promise<VehiclesEntity[]> {
    return this.vehiclesRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: this.relations
    });
  }

  getVehiclesById(id: number): Promise<VehiclesEntity> | null {
    return this.vehiclesRepository.findOne({ where: { id: id}, relations: this.relations });
  }

  async addVehicles(vehicles: Partial<VehiclesEntity>[]): Promise<VehiclesEntity[]> {
    let result: VehiclesEntity[] = [];
    for (let i = 0; i < vehicles.length; i++) {
      vehicles[i].image_names = [];
      result.push(await this.vehiclesRepository.save(await this.addRelations(vehicles[i])));
    }
    return result
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
    return this.vehiclesRepository.save(await this.addRelations(vehicle));
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

  async addRelations(obj: Partial<VehiclesEntity>): Promise<Partial<VehiclesEntity>> {
      for (const rel of this.relations) {
        if (!obj[rel + "Objs"] || obj[rel]) obj[rel + "Objs"] = [];
  
        for (let i = 0; i < obj[rel].length; i++) {
          let relObj = await this[rel + 'Repository'].findOneBy({url: obj[rel][i]})
          if (relObj) obj[rel + "Objs"].push(relObj);
        }

      }
      return obj
    }

}
