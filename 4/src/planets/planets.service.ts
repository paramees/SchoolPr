import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanetsEntity } from './entity/planets.entity';
import { ReadStream, createReadStream, unlink } from 'fs';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(PlanetsEntity)
    private planetsRepository: Repository<PlanetsEntity>,
  ) { }

  getLastTenPlanets(): Promise<PlanetsEntity[]> {
    return this.planetsRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  getPlanetsById(id: number): Promise<PlanetsEntity> | null {
    return this.planetsRepository.findOneBy({ id });
  }

  async addPlanets(planet: Partial<PlanetsEntity>): Promise<PlanetsEntity> {
    if (!planet.image_names) planet.image_names = [];
    return await this.planetsRepository.save(planet);
  }

  async removePlanetsById(id: number): Promise<void> {
    await this.planetsRepository.delete(id);
  }

  async updatePlanets(id: number, vehicleUpd: Partial<PlanetsEntity>): Promise<PlanetsEntity> | null {
    let planet = await this.planetsRepository.findOneBy({ id });
    if (!planet) {
      return null;
    }
    Object.assign(planet, vehicleUpd);
    return this.planetsRepository.save(planet);
  }

  async addPlanetsImage(id: number, filenames: string[]): Promise<string | PlanetsEntity> {
    let planet = await this.planetsRepository.findOneBy({ id });
    if (!planet) {
      return "no planets with id: " + id;
    }
    filenames.forEach(el => planet.image_names.push(el));
    return await this.planetsRepository.save(planet);
  }

  async removePlanetsImage(id: number, name: string): Promise<string | PlanetsEntity> {
    let planet = await this.planetsRepository.findOneBy({ id });
    if (!planet) {
      return "no planets with id: " + id;
    }
    planet.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.planetsRepository.save(planet);
  }

  async getPlanetsImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
