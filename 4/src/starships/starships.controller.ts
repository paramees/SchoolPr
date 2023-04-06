import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
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
    @ApiResponse({ status: 201, description: 'Add one starship to data base.' })
    async addStarships(@Body() starship: PostStarshipsDtoValidate): Promise<StarshipsDto> {
        return await this.starshipsService.addStarships(starship)
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
    @UseInterceptors(FilesInterceptor('files', null, {
        storage: diskStorage({
            destination: './images/starships',
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
    addStarshipsImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        let filenames = files.map(file => file.filename);
        return this.starshipsService.addStarshipsImage(id, filenames)
    }

    @Post("/:id/deleteimage")
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one starship image by starship id and image name.' })
    removeStarshipsImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): string {
        this.starshipsService.removeStarshipsImage(id, body.name)
        return "Starships image with id " + id + " named " + body.name + " was deleted."
    }

    @Get('images/:imageName')
    @ApiResponse({ status: 201, description: 'Get starship image by image name.' })
    async getStarshipsImage(@Param('imageName') imageName: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const file = await this.starshipsService.getStarshipsImage(imageName);
        res.set({
            'Content-Type': 'image/' + imageName.split('.').pop(),
          });
        return new StreamableFile(file)
    }

}


