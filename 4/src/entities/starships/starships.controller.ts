import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

import { StarshipsDto } from './dto/starships.dto';
import { PostStarshipsDtoValidate } from './dto/post.starships-validation.dto';
import { UpdateStarshipsDtoValidate } from './dto/update.starships-validation.dto';

import { StarshipsService } from './starships.service';


@ApiTags("StarshipsApi-CRUD")
@Controller('starships')
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last starships in data base.' })
    async getLastTenStarships(): Promise<StarshipsDto[]> {
        return await this.starshipsService.getLastTenStarships()
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return starship by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<StarshipsDto> {
        return await this.starshipsService.getStarshipsById(id)
    }

    @Post("add")
    @ApiBody({type: [PostStarshipsDtoValidate]})
    @ApiResponse({ status: 201, description: 'Add one starship to data base.' })
    async addStarships(@Body(new ParseArrayPipe({ items: PostStarshipsDtoValidate })) starships: PostStarshipsDtoValidate[]): Promise<StarshipsDto[]> {
        return await this.starshipsService.addStarships(starships)
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one starship by id from data base.' })
    removeStarshipsById(@Param('id', ParseIntPipe) id: number): string {
        this.starshipsService.removeStarshipsById(id)
        return "starship with id " + id + " was deleted."
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one starship by id in data base.' })
    async updateStarships(@Body() body: UpdateStarshipsDtoValidate): Promise<StarshipsDto> {
        return await this.starshipsService.updateStarships(body.id, body)
    }

    @Post("/:id/addimage")
    @ApiResponse({ status: 201, description: 'Upload images by starship id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files'))
    addStarshipsImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        return this.starshipsService.addStarshipsImage(id, files)
    }

    @Post("/:id/deleteimage")
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one starship image by starship id and image name.' })
    async removeStarshipsImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): Promise<string | StarshipsDto> {
        return await this.starshipsService.removeStarshipsImage(id, body.name)
    }

    @Get('images/:imageName')
    @ApiResponse({ status: 201, description: 'Get starship image by image name.' })
    async getStarshipsImage(@Param('imageName') imageName: string, @Res() res: Response) {
        res.attachment(imageName);
        (await this.starshipsService.getStarshipsImage(imageName)).pipe(res);
    }

}


