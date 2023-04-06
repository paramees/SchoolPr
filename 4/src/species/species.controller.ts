import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

import { SpeciesDto } from './dto/species.dto';
import { PostSpeciesDtoValidate } from './dto/post.species-validation.dto';
import { UpdateSpeciesDtoValidate } from './dto/update.species-validation.dto';

import { SpeciesService } from './species.service';


@ApiTags("SpeciesApi-CRUD")
@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last species in data base.' })
    async getLastTenSpecies(): Promise<SpeciesDto[]> {
        return await this.speciesService.getLastTenSpecies()
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return specie by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<SpeciesDto> {
        return await this.speciesService.getSpeciesById(id)
    }

    @Post("add")
    @ApiResponse({ status: 201, description: 'Add one specie to data base.' })
    async addSpecies(@Body() Specie: PostSpeciesDtoValidate): Promise<SpeciesDto> {
        return await this.speciesService.addSpecies(Specie)
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one specie by id from data base.' })
    removeSpeciesById(@Param('id', ParseIntPipe) id: number): string {
        this.speciesService.removeSpeciesById(id)
        return "Specie with id " + id + " was deleted."
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one specie by id in data base.' })
    async updateSpecies(@Body() body: UpdateSpeciesDtoValidate): Promise<SpeciesDto> {
        return await this.speciesService.updateSpecies(body.id, body)
    }

    @Post("/:id/addimage")
    @ApiResponse({ status: 201, description: 'Upload images by specie id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files', null, {
        storage: diskStorage({
            destination: './images/species',
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
    addSpeciesImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        let filenames = files.map(file => file.filename);
        return this.speciesService.addSpeciesImage(id, filenames)
    }

    @Post("/:id/deleteimage")
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one specie image by specie id and image name.' })
    removeSpeciesImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): string {
        this.speciesService.removeSpeciesImage(id, body.name)
        return "Species image with id " + id + " named " + body.name + " was deleted."
    }

    @Get('images/:imageName')
    @ApiResponse({ status: 201, description: 'Get specie image by image name.' })
    async getSpeciesImage(@Param('imageName') imageName: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const file = await this.speciesService.getSpeciesImage(imageName);
        res.set({
            'Content-Type': 'image/' + imageName.split('.').pop(),
          });
        return new StreamableFile(file)
    }

}


