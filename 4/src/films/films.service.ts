import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsEntity } from './entity/films.entity';
import { ReadStream, createReadStream, unlink } from 'fs';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import { StarshipsEntity } from 'src/starships/entity/starships.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(PeopleEntity)
    private charactersRepository: Repository<PeopleEntity>,
    @InjectRepository(StarshipsEntity)
    private starshipsRepository: Repository<StarshipsEntity>,
    @InjectRepository(VehiclesEntity)
    private vehiclesRepository: Repository<VehiclesEntity>,
    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,
    @InjectRepository(PlanetsEntity)
    private planetsRepository: Repository<PlanetsEntity>,
  ) { }

  private relations = ['characters', 'starships', 'vehicles', 'species', 'planets'];

  getLastTenFilms(): Promise<FilmsEntity[]> {
    return this.filmsRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: this.relations
    });
  }

  getFilmsById(id: number): Promise<FilmsEntity> | null {
    return this.filmsRepository.findOne({ where: { id: id}, relations: this.relations });
  }

  async addFilms(films: Partial<FilmsEntity>[]): Promise<FilmsEntity[]> {
    let result: FilmsEntity[] = [];
    for (let i = 0; i < films.length; i++) {
      films[i].image_names = [];
      result.push(await this.filmsRepository.save(await this.addRelations(films[i])));
    }
    return result
  }

  async removeFilmsById(id: number): Promise<void> {
    await this.filmsRepository.delete(id);
  }

  async updateFilms(id: number, filmsUpd: Partial<FilmsEntity>): Promise<FilmsEntity> | null {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return null;
    }
    Object.assign(films, filmsUpd);
    return this.filmsRepository.save(await this.addRelations(films));
  }

  async addFilmsImage(id: number, filenames: string[]): Promise<string | FilmsEntity> {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return "no films with id: " + id;
    }
    filenames.forEach(el => films.image_names.push(el));
    return await this.filmsRepository.save(films);
  }

  async removeFilmsImage(id: number, name: string): Promise<string | FilmsEntity> {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return "no films with id: " + id;
    }
    films.image_names = films.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.filmsRepository.save(films);
  }

  async getFilmsImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

  async addRelations(obj: Partial<FilmsEntity>): Promise<Partial<FilmsEntity>> {
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
