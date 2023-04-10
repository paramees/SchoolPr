import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarshipsEntity } from './entity/starships.entity';
import { ReadStream, createReadStream, unlink } from 'fs';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(StarshipsEntity)
    private starshipsRepository: Repository<StarshipsEntity>,
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(PeopleEntity)
    private pilotsRepository: Repository<PeopleEntity>,
  ) { }

  private relations = ['pilots', 'films'];

  getLastTenStarships(): Promise<StarshipsEntity[]> {
    return this.starshipsRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: this.relations
    });
  }

  getStarshipsById(id: number): Promise<StarshipsEntity> | null {
    return this.starshipsRepository.findOne({ where: { id: id}, relations: this.relations });
  }

  async addStarships(starships: Partial<StarshipsEntity>[]): Promise<StarshipsEntity[]> {
    let result: StarshipsEntity[] = [];
    for (let i = 0; i < starships.length; i++) {
      starships[i].image_names = [];
      result.push(await this.starshipsRepository.save(await this.addRelations(starships[i])));
    }
    return result
  }

  async removeStarshipsById(id: number): Promise<void> {
    await this.starshipsRepository.delete(id);
  }

  async updateStarships(id: number, starshipUpd: Partial<StarshipsEntity>): Promise<StarshipsEntity> | null {
    let starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      return null;
    }
    Object.assign(starship, starshipUpd);
    return this.starshipsRepository.save(await this.addRelations(starship));
  }

  async addStarshipsImage(id: number, filenames: string[]): Promise<string | StarshipsEntity> {
    let starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      return "no starships with id: " + id;
    }
    filenames.forEach(el => starship.image_names.push(el));
    return await this.starshipsRepository.save(starship);
  }

  async removeStarshipsImage(id: number, name: string): Promise<string | StarshipsEntity> {
    let starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      return "no starships with id: " + id;
    }
    starship.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.starshipsRepository.save(starship);
  }

  async getStarshipsImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

  async addRelations(obj: Partial<StarshipsEntity>): Promise<Partial<StarshipsEntity>> {
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
