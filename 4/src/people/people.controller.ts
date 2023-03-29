import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PeopleDto } from './dto/people.dto';
import { PeopleService } from './people.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PostPeopleDtoValidate } from './dto/post.people-validation.dto';
import { IdValidate } from './dto/del.id.people-validation.dto';
import { PeopleEntity } from './entity/people.entity';
import { UpdatePeopleDtoValidate } from './dto/update.people-validation.dto';

@ApiTags("PeopleApi-CRUD")
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last people in data base.'})
    async getLastTenPeople() : Promise<PeopleDto[]> {
        return transformStrToMass(await this.peopleService.getLastTenPeople())
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return people by id in data base.'})
    async getOneById(@Param('id', ParseIntPipe) id: number) : Promise<PeopleDto> {
        return transformStrToMass([await this.peopleService.getPeopleById(id)])[0]
    }

    @Post("add")
    @ApiResponse({ status: 201, description: 'Add one people in data base.'})
    addPeople(@Body() people : PostPeopleDtoValidate) {
        this.peopleService.addPeople(transformMassToSrt(people))
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one people by id from data base.'})
    removePeopleById(@Param('id', ParseIntPipe) id: number) {
        this.peopleService.removePeopleById(id)
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one people by id in data base.'})
    updatePeople(@Body() body: UpdatePeopleDtoValidate) {
        this.peopleService.updatePeople(body.id, transformMassToSrt(body))
    }
    
}

function transformMassToSrt(people: PostPeopleDtoValidate | UpdatePeopleDtoValidate): PeopleEntity {
    for (let key in people) {
        if (Array.isArray(people[key])) {
            people[key] = people[key].join(", ");
        } else {
            people[key] = people[key]
        }
    }
    return <PeopleEntity>people
}

function transformStrToMass(people: PeopleEntity[]): PeopleDto[] {
    let newPeople : PeopleDto[] = [];
    people.forEach(el => {
        let newEl : PeopleDto = el
        newEl.species = el.species.split(", ");
        newEl.films = el.films.split(", ");
        newEl.starships = el.starships.split(", ");
        newEl.vehicles = el.vehicles.split(", ");
        newPeople.push(newEl);
    })
    return newPeople;
}


