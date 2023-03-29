import { Injectable } from '@nestjs/common';
import { PeopleDto } from './dto/people.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleEntity } from './entity/people.entity';
import { PostPeopleDtoValidate } from './dto/post.people-validation.dto';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(PeopleEntity)
        private peopleRepository: Repository<PeopleEntity>,
      ) {}

    getLastTenPeople() : Promise<PeopleEntity[]> {
        return this.peopleRepository.find({
            order: {id: 'DESC'},
            take: 10, 
          });
    }

    getPeopleById(id: number) : Promise<PeopleEntity> | null {
        return this.peopleRepository.findOneBy({id});
    }

    async addPeople(people : Partial<PeopleEntity>): Promise<void> {
        await this.peopleRepository.save(people);
    }

    async removePeopleById(id: number): Promise<void> {
        await this.peopleRepository.delete(id)
    }

    async updatePeople(id : number, peopleUpd: PeopleEntity) : Promise<PeopleEntity> | null {
        let people = await this.peopleRepository.findOneBy({id});
    if (!people) {
      return null;
    }
    Object.assign(people, peopleUpd);
    return this.peopleRepository.save(people);
  }

}
