import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { PeopleDto } from './dto/people.dto';
import { UpdatePeopleDtoValidate } from './dto/update.people-validation.dto';
import { PostPeopleDtoValidate } from './dto/post.people-validation.dto';

import { PeopleService } from './people.service';
import { JwtAuthGuard } from 'src/middleware/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/middleware/auth/guards/role.guard';
import { Roles } from 'src/middleware/roles.decorator';


@ApiTags("PeopleApi-CRUD")
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) { }


    @Get()
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return 10 last people in data base.' })
    async getLastTenPeople(): Promise<PeopleDto[]> {
        return await this.peopleService.getLastTenPeople()
    }

    @Get("/:id")
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return people by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<PeopleDto> {
        return await this.peopleService.getPeopleById(id)
    }

    @Post("add")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: [PostPeopleDtoValidate] })
    @ApiResponse({ status: 201, description: 'Add one people in data base.' })
    async addPeople(@Body(new ParseArrayPipe({ items: PostPeopleDtoValidate })) people: PostPeopleDtoValidate[]): Promise<PeopleDto[]> {
        return await this.peopleService.addPeople(people)
    }

    @Post("delete/:id")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Remove one people by id from data base.' })
    removePeopleById(@Param('id', ParseIntPipe) id: number): string {
        this.peopleService.removePeopleById(id)
        return "People with id " + id + " was deleted."
    }

    @Post("update")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Update one people by id in data base.' })
    async updatePeople(@Body() body: UpdatePeopleDtoValidate): Promise<String | PeopleDto> {
        return await this.peopleService.updatePeople(body.id, body)
    }

    @Post("/:id/addimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Upload images by people id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files'))
    async addPeopleImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]): Promise<string | PeopleDto> {
        return this.peopleService.addPeopleImage(id, files)
    }

    @Post("/:id/deleteimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string' } } } })
    @ApiResponse({ status: 201, description: 'Remove one people image by people id and image name.' })
    async removePeopleImage(@Param('id', ParseIntPipe) id: number, @Body() body: { name: string }): Promise<PeopleDto | string> {
        return await this.peopleService.removePeopleImage(id, body.name)
    }

    @Get('images/:imageName')
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Get people image by image name.' })
    async getPeopleImage(@Param('imageName') imageName: string, @Res() res: Response) {
        res.attachment(imageName);
        (await this.peopleService.getPeopleImage(imageName)).pipe(res);
    }

}