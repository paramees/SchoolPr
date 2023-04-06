import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleEntity } from './entity/people.entity';
import { ReadStream, createReadStream, unlink } from 'fs';
import { FilmsEntity } from 'src/films/entity/films.entity';


@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
  ) { }

  getLastTenPeople(): Promise<PeopleEntity[]> {
    return this.peopleRepository.find({
      order: { id: 'DESC' },
      take: 10,
      relations: {filmsObjs: true}
    });
  }

  getPeopleById(id: number): Promise<PeopleEntity> | null {
    return this.peopleRepository.findOneBy({ id });
  }

  async addPeople(people: Partial<PeopleEntity>): Promise<PeopleEntity> {
    people.image_names = [];
    people.filmsObjs = [];
    for (let i = 0; i < people.films.length; i++) {
      let film = await this.filmsRepository.findOneBy({url: people.films[i]})
      console.log(film + "   " + people.films[i])
      if (film) people.filmsObjs.push(film)
    }
    return await this.peopleRepository.save(people);
  }

  async removePeopleById(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  async updatePeople(id: number, peopleUpd: Partial<PeopleEntity>): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return "no people with id: " + id;
    }
    Object.assign(people, peopleUpd);
    return this.peopleRepository.save(people);
  }

  async addPeopleImage(id: number, filenames: string[]): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return "no people with id: " + id;
    }
    filenames.forEach(el => people.image_names.push(el))
    return await this.peopleRepository.save(people);
  }

  async removePeopleImage(id: number, name: string): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return "no people with id: " + id;
    }
    people.image_names = people.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.peopleRepository.save(people);
  }

  async getPeopleImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
