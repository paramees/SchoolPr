import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleEntity } from './entity/people.entity';
import { FilmsEntity } from 'src/entities/films/entity/films.entity';
import { StarshipsEntity } from 'src/entities/starships/entity/starships.entity';
import { VehiclesEntity } from 'src/entities/vehicles/entity/vehicles.entity';
import { SpeciesEntity } from 'src/entities/species/entity/species.entity';
import { PlanetsEntity } from 'src/entities/planets/entity/planets.entity';
import { ImagesService } from 'src/middleware/images_aws/images.service';


@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
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

  private  relations = ['films', 'starships', 'vehicles', 'species'];

  getLastTenPeople(): Promise<PeopleEntity[]> {
    return this.peopleRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: this.relations
    });
  }

  getPeopleById(id: number): Promise<PeopleEntity> | null {
    return this.peopleRepository.findOne({ where: { id: id}, relations: this.relations });
  }

  async addPeople(people: Partial<PeopleEntity>[]): Promise<PeopleEntity[]> {
    let result: PeopleEntity[] = [];
    for (let i = 0; i < people.length; i++) {
      people[i].image_names = [];
      result.push(await this.peopleRepository.save(await this.addRelations(people[i])));
    }
    return result
  }

  async removePeopleById(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  async updatePeople(id: number, peopleUpd: Partial<PeopleEntity>): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOne({ 
      where: {id: id}, 
      relations: {
        filmsObjs: true,
        speciesObjs: true,
        vehiclesObjs: true,
        starshipsObjs: true
      } 
    });
    if (!people) {
      return "no people with id: " + id;
    }
    Object.assign(people, peopleUpd);
    return this.peopleRepository.save(await this.addRelations(people));
  }

  async addPeopleImage(id: number, files: Express.Multer.File[]): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return "no people with id: " + id;
    }
    (await this.imagesService.addImages('people', files)).forEach(el => people.image_names.push(el));
    return await this.peopleRepository.save(people);
  }

  async removePeopleImage(id: number, name: string): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return "no people with id: " + id;
    }
    if (!(await this.imagesService.deleteImage(name))) return "Image was not deleted!"

    people.image_names = people.image_names.filter(el => el !== name);
    return await this.peopleRepository.save(people);
  }

  async getPeopleImage(name: string) {
    return this.imagesService.getImage(name)
  }

  async addRelations(obj: Partial<PeopleEntity>): Promise<Partial<PeopleEntity>> {
   
    let home = await this.planetsRepository.findOneBy({url: obj.homeworld})
    if (home) obj.homeworldObj = home
    
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
