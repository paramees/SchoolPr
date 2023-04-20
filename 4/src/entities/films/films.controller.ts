import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { FilmsDto } from './dto/films.dto';
import { PostFilmsDtoValidate } from './dto/post.films-validation.dto';
import { UpdateFilmsDtoValidate } from './dto/update.films-validation.dto';

import { FilmsService } from './films.service';

import { Roles } from 'src/middleware/roles.decorator';
import { JwtAuthGuard } from 'src/middleware/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/middleware/auth/guards/role.guard';


@ApiBearerAuth()
@ApiTags("FilmsApi-CRUD")
@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { }

    @Get()
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return 10 last films in data base.' })
    async getLastTenfilms(): Promise<FilmsDto[]> {
        return await this.filmsService.getLastTenFilms()
    }

    @Get("/:id")
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return film by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<FilmsDto> {
        return await this.filmsService.getFilmsById(id)
    }

    @Post("add")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({type: [PostFilmsDtoValidate]})
    @ApiResponse({ status: 201, description: 'Add one film to data base.' })
    async addfilms(@Body(new ParseArrayPipe({ items: PostFilmsDtoValidate })) film: PostFilmsDtoValidate[]): Promise<FilmsDto[]> {
        return await this.filmsService.addFilms(film)
    }

    @Post("delete/:id")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Remove one film by id from data base.' })
    removefilmsById(@Param('id', ParseIntPipe) id: number): string {
        this.filmsService.removeFilmsById(id)
        return "film with id " + id + " was deleted."
    }

    @Post("update")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Update one film by id in data base.' })
    async updatefilms(@Body() body: UpdateFilmsDtoValidate): Promise<FilmsDto> {
        return await this.filmsService.updateFilms(body.id, body)
    }

    @Post("/:id/addimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Upload images by film id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files'))
    addfilmsImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        return this.filmsService.addFilmsImage(id, files)
    }

    @Post("/:id/deleteimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one film image by film id and image name.' })
    async removefilmsImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): Promise<string | FilmsDto> {
        return await this.filmsService.removeFilmsImage(id, body.name)
    }

    @Get('images/:imageName')
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Get film image by image name.' })
    async getfilmsImage(@Param('imageName') imageName: string, @Res() res: Response) {
        res.attachment(imageName);
        (await this.filmsService.getFilmsImage(imageName)).pipe(res);
    }

}