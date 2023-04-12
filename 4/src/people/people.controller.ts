import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';

import { PeopleDto } from './dto/people.dto';
import { UpdatePeopleDtoValidate } from './dto/update.people-validation.dto';
import { PostPeopleDtoValidate } from './dto/post.people-validation.dto';

import { PeopleService } from './people.service';


@ApiTags("PeopleApi-CRUD")
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last people in data base.' })
    async getLastTenPeople(): Promise<PeopleDto[]> {
        return await this.peopleService.getLastTenPeople()
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return people by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<PeopleDto> {
        return await this.peopleService.getPeopleById(id)
    }

    @Post("add")
    @ApiBody({type: [PostPeopleDtoValidate]})
    @ApiResponse({ status: 201, description: 'Add one people in data base.' })
    async addPeople(@Body(new ParseArrayPipe({ items: PostPeopleDtoValidate })) people: PostPeopleDtoValidate[]): Promise<PeopleDto[]> {
        return await this.peopleService.addPeople(people)
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one people by id from data base.' })
    removePeopleById(@Param('id', ParseIntPipe) id: number): string {
        this.peopleService.removePeopleById(id)
        return "People with id " + id + " was deleted."
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one people by id in data base.' })
    async updatePeople(@Body() body: UpdatePeopleDtoValidate): Promise<String | PeopleDto> {
        return await this.peopleService.updatePeople(body.id, body)
    }

    @Post("/:id/addimage")
    @ApiResponse({ status: 201, description: 'Upload images by people id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files', null, {
        storage: diskStorage({
            destination: './images/people',
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
    addPeopleImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]): Promise<String | PeopleDto> {
        let filenames = files.map(file => file.filename);
        return this.peopleService.addPeopleImage(id, filenames)
    }

    @Post("/:id/deleteimage")
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one people image by people id and image name.' })
    removePeopleImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): string {
        this.peopleService.removePeopleImage(id, body.name)
        return "People image with id " + id + " named " + body.name + " was deleted."
    }

    @Get('images/:imageName')
    @ApiResponse({ status: 201, description: 'Get people image by image name.' })
    async getPeopleImage(@Param('imageName') imageName: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const file = await this.peopleService.getPeopleImage(imageName);
        res.set({
            'Content-Type': 'image/' + imageName.split('.').pop(),
          });
        return new StreamableFile(file)
    }

}