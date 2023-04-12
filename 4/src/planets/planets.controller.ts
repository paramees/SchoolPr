import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

import { PlanetsDto } from './dto/planets.dto';
import { PostPlanetsDtoValidate } from './dto/post.planets-validation.dto';
import { UpdatePlanetsDtoValidate } from './dto/update.planets-validation.dto';

import { PlanetsService } from './planets.service';


@ApiTags("PlanetsApi-CRUD")
@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last planets in data base.' })
    async getLastTenPlanets(): Promise<PlanetsDto[]> {
        return await this.planetsService.getLastTenPlanets()
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return planet by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<PlanetsDto> {
        return await this.planetsService.getPlanetsById(id)
    }

    @Post("add")
    @ApiBody({type: [PostPlanetsDtoValidate]})
    @ApiResponse({ status: 201, description: 'Add one planet to data base.' })
    async addPlanets(@Body(new ParseArrayPipe({ items: PostPlanetsDtoValidate })) planet: PostPlanetsDtoValidate[]): Promise<PlanetsDto[]> {
        return await this.planetsService.addPlanets(planet)
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one planet by id from data base.' })
    removePlanetsById(@Param('id', ParseIntPipe) id: number): string {
        this.planetsService.removePlanetsById(id)
        return "planet with id " + id + " was deleted."
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one planet by id in data base.' })
    async updatePlanets(@Body() body: UpdatePlanetsDtoValidate): Promise<PlanetsDto> {
        return await this.planetsService.updatePlanets(body.id, body)
    }

    @Post("/:id/addimage")
    @ApiResponse({ status: 201, description: 'Upload images by planet id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files', null, {
        storage: diskStorage({
            destination: './images/planets',
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
    addPlanetsImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        let filenames = files.map(file => file.filename);
        return this.planetsService.addPlanetsImage(id, filenames)
    }

    @Post("/:id/deleteimage")
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one planet image by planet id and image name.' })
    removePlanetsImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): string {
        this.planetsService.removePlanetsImage(id, body.name)
        return "Planets image with id " + id + " named " + body.name + " was deleted."
    }

    @Get('images/:imageName')
    @ApiResponse({ status: 201, description: 'Get planet image by image name.' })
    async getPlanetsImage(@Param('imageName') imageName: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const file = await this.planetsService.getPlanetsImage(imageName);
        res.set({
            'Content-Type': 'image/' + imageName.split('.').pop(),
          });
        return new StreamableFile(file)
    }

}


