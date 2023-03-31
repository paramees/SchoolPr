import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PeopleDto } from './dto/people.dto';
import { PeopleService } from './people.service';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { PostPeopleDtoValidate } from './dto/post.people-validation.dto';
import { PeopleEntity } from './entity/people.entity';
import { UpdatePeopleDtoValidate } from './dto/update.people-validation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';

@ApiTags("PeopleApi-CRUD")
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last people in data base.' })
    async getLastTenPeople(): Promise<PeopleDto[]> {
        return transformStrToMass(await this.peopleService.getLastTenPeople())
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return people by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<PeopleDto> {
        return transformStrToMass([await this.peopleService.getPeopleById(id)])[0]
    }

    @Post("add")
    @ApiResponse({ status: 201, description: 'Add one people in data base.' })
    addPeople(@Body() people: PostPeopleDtoValidate) {
        return this.peopleService.addPeople(transformMassToSrt(people))
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one people by id from data base.' })
    removePeopleById(@Param('id', ParseIntPipe) id: number): string {
        this.peopleService.removePeopleById(id)
        return "People with id " + id + " was deleted."
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one people by id in data base.' })
    updatePeople(@Body() body: UpdatePeopleDtoValidate) {
        return this.peopleService.updatePeople(body.id, transformMassToSrt(body))
    }

    @Post("/:id/addimage")
    @ApiResponse({ status: 201, description: 'Upload files by people id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files', null, {
        storage: diskStorage({
            destination: './images',
            filename: (req: Request, file: Express.Multer.File, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
            }
        }),
        fileFilter: (req: Request, file: Express.Multer.File, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    }))
    addPeopleImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        let filenames = files.map(file => file.filename);
        return this.peopleService.addPeopleImage(id, filenames)
    }

    @Post("/:id/deleteimage")
    @ApiResponse({ status: 201, description: 'Remove one people by id from data base.' })
    removePeopleImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): string {
        this.peopleService.removePeopleImage(id, body.name)
        return "People image with id " + id + " named " + body.name + " was deleted."
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
    let newPeople: PeopleDto[] = [];
    people.forEach(el => {
        let newEl: PeopleDto = el
        newEl.species = el.species.split(", ");
        newEl.films = el.films.split(", ");
        newEl.starships = el.starships.split(", ");
        newEl.vehicles = el.vehicles.split(", ");
        newPeople.push(newEl);
    })
    return newPeople;
}


