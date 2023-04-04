import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleEntity } from './entity/people.entity';
import fs, { createReadStream } from 'fs';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
  ) { }

  getLastTenPeople(): Promise<PeopleEntity[]> {
    return this.peopleRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  getPeopleById(id: number): Promise<PeopleEntity> | null {
    return this.peopleRepository.findOneBy({ id });
  }

  async addPeople(people: Partial<PeopleEntity>): Promise<PeopleEntity> {
    if (!people.image_names) people.image_names = [];
    return await this.peopleRepository.save(people);
  }

  async removePeopleById(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  async updatePeople(id: number, peopleUpd: Partial<PeopleEntity>): Promise<PeopleEntity> | null {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return null;
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

    fs.unlink(name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.peopleRepository.save(people);
  }

  async getPeopleImage(name: string): Promise<fs.ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
