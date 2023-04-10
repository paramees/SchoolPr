import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from './entity/Species.entity';
import { ReadStream, createReadStream, unlink } from 'fs';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
  ) { }

 private relations = ['films', 'people'];

  getLastTenSpecies(): Promise<SpeciesEntity[]> {
    return this.speciesRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: this.relations
    });
  }

  getSpeciesById(id: number): Promise<SpeciesEntity> | null {
    return this.speciesRepository.findOne({ where: { id: id}, relations: this.relations });
  }

  async addSpecies(species: Partial<SpeciesEntity>[]): Promise<SpeciesEntity[]> {
    let result: SpeciesEntity[] = [];
    for (let i = 0; i < species.length; i++) {
      species[i].image_names = [];
      result.push(await this.speciesRepository.save(await this.addRelations(species[i])));
    }
    return result
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
    return this.speciesRepository.save(await this.addRelations(species));
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

  async addRelations(obj: Partial<SpeciesEntity>): Promise<Partial<SpeciesEntity>> {
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
