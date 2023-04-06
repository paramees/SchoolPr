import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from './entity/Species.entity';
import { ReadStream, createReadStream, unlink } from 'fs';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,
  ) { }

  getLastTenSpecies(): Promise<SpeciesEntity[]> {
    return this.speciesRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  getSpeciesById(id: number): Promise<SpeciesEntity> | null {
    return this.speciesRepository.findOneBy({ id });
  }

  async addSpecies(species: Partial<SpeciesEntity>): Promise<SpeciesEntity> {
    if (!species.image_names) species.image_names = [];
    return await this.speciesRepository.save(species);
  }

  async removeSpeciesById(id: number): Promise<void> {
    await this.speciesRepository.delete(id);
  }

  async updateSpecies(id: number, speciesUpd: Partial<SpeciesEntity>): Promise<SpeciesEntity> | null {
    let species = await this.speciesRepository.findOneBy({ id });
    if (!species) {
      return null;
    }
    Object.assign(species, speciesUpd);
    return this.speciesRepository.save(species);
  }

  async addSpeciesImage(id: number, filenames: string[]): Promise<string | SpeciesEntity> {
    let species = await this.speciesRepository.findOneBy({ id });
    if (!species) {
      return "no Species with id: " + id;
    }
    filenames.forEach(el => species.image_names.push(el));
    return await this.speciesRepository.save(species);
  }

  async removeSpeciesImage(id: number, name: string): Promise<string | SpeciesEntity> {
    let species = await this.speciesRepository.findOneBy({ id });
    if (!species) {
      return "no Species with id: " + id;
    }
    species.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.speciesRepository.save(species);
  }

  async getSpeciesImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
