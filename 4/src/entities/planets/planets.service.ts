import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { FilmsEntity } from '../films/entity/films.entity';
import { PeopleEntity } from '../people/entity/people.entity';
import { PlanetsEntity } from './entity/planets.entity';


@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(PlanetsEntity)
    private planetsRepository: Repository<PlanetsEntity>,
    @InjectRepository(PeopleEntity)
    private residentsRepository: Repository<PeopleEntity>,
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,

    private readonly imagesService: ImagesService
  ) { }

  private relations = ['films', 'residents'];

  getLastTenPlanets(): Promise<PlanetsEntity[]> {
    return this.planetsRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: this.relations.map(el => el + "Objs")
    });
  }

  getPlanetsById(id: number): Promise<PlanetsEntity> | null {
    return this.planetsRepository.findOne({ where: { id: id}, relations: this.relations.map(el => el + "Objs") });
  }

  async addPlanets(planets: Partial<PlanetsEntity>[]): Promise<PlanetsEntity[]> {
    let result: PlanetsEntity[] = [];
    for (let i = 0; i < planets.length; i++) {
      planets[i].image_names = [];
      result.push(await this.planetsRepository.save(await this.addRelations(planets[i])));
    }
    return result
  }

  async removePlanetsById(id: number): Promise<void> {
    await this.planetsRepository.delete(id);
  }

  async updatePlanets(id: number, vehicleUpd: Partial<PlanetsEntity>): Promise<PlanetsEntity> | null {
    let planets = await this.planetsRepository.findOneBy({ id });
    if (!planets) {
      return null;
    }
    Object.assign(planets, vehicleUpd);
    return this.planetsRepository.save(await this.addRelations(planets));
  }

  async addPlanetsImage(id: number, files: Express.Multer.File[]): Promise<string | PlanetsEntity> {
    let planets = await this.planetsRepository.findOneBy({ id });
    if (!planets) {
      return "no planets with id: " + id;
    }
    (await this.imagesService.addImages('planet', files)).forEach(el => planets.image_names.push(el));
    return await this.planetsRepository.save(planets);
  }

  async removePlanetsImage(id: number, name: string): Promise<string | PlanetsEntity> {
    let planets = await this.planetsRepository.findOneBy({ id });
    if (!planets) {
      return "no planets with id: " + id;
    }
    if (!(await this.imagesService.deleteImage(name))) return "Image was not deleted!"

    planets.image_names.filter(el => el !== name);
    return await this.planetsRepository.save(planets);
  }

  async getPlanetsImage(name: string) {
    return this.imagesService.getImage(name)
  }

  async addRelations(obj: Partial<PlanetsEntity>): Promise<Partial<PlanetsEntity>> {
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
