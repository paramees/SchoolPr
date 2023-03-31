import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleEntity } from './entity/people.entity';

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
    return await this.peopleRepository.save(people);
  }

  async removePeopleById(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  async updatePeople(id: number, peopleUpd: PeopleEntity): Promise<PeopleEntity> | null {
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
    people.image_names = filenames.join(", ");
    return await this.peopleRepository.save(people);
  }

  async removePeopleImage (id: number, name: string): Promise<string | PeopleEntity> {
    let people = await this.peopleRepository.findOneBy({ id });
    if (!people) {
      return "no people with id: " + id;
    }
    people.image_names = people.image_names.split(", ").filter(el => el !== name).join(", ");
    return await this.peopleRepository.save(people);
  }

}
