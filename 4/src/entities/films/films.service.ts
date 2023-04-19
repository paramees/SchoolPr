import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsEntity } from './entity/films.entity';
import { PlanetsEntity } from 'src/entities/planets/entity/planets.entity';
import { SpeciesEntity } from 'src/entities/species/entity/species.entity';
import { VehiclesEntity } from 'src/entities/vehicles/entity/vehicles.entity';
import { StarshipsEntity } from 'src/entities/starships/entity/starships.entity';
import { PeopleEntity } from 'src/entities/people/entity/people.entity';
import { ImagesService } from 'src/middleware/images_aws/images.service';

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

    private readonly imagesService: ImagesService
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

  async addFilmsImage(id: number, files: Express.Multer.File[]): Promise<string | FilmsEntity> {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return "no films with id: " + id;
    }
    (await this.imagesService.addImages('film', files)).forEach(el => films.image_names.push(el));
    return await this.filmsRepository.save(films);
  }

  async removeFilmsImage(id: number, name: string): Promise<string | FilmsEntity> {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return "no films with id: " + id;
    }
    if (!(await this.imagesService.deleteImage(name))) return "Image was not deleted!"

    films.image_names = films.image_names.filter(el => el !== name);
    return await this.filmsRepository.save(films);
  }

  async getFilmsImage(name: string) {
    return this.imagesService.getImage(name)
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
