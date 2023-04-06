import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

import { VehiclesDto } from './dto/vehicles.dto';
import { PostVehiclesDtoValidate } from './dto/post.vehicles-validation.dto';
import { UpdateVehiclesDtoValidate } from './dto/update.vehicles-validation.dto';

import { VehiclesService } from './vehicles.service';


@ApiTags("VehiclesApi-CRUD")
@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly VehiclesService: VehiclesService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return 10 last vehicles in data base.' })
    async getLastTenVehicles(): Promise<VehiclesDto[]> {
        return await this.VehiclesService.getLastTenVehicles()
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Return vehicle by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<VehiclesDto> {
        return await this.VehiclesService.getVehiclesById(id)
    }

    @Post("add")
    @ApiResponse({ status: 201, description: 'Add one vehicle to data base.' })
    async addVehicles(@Body() vehicle: PostVehiclesDtoValidate): Promise<VehiclesDto> {
        return await this.VehiclesService.addVehicles(vehicle)
    }

    @Post("delete/:id")
    @ApiResponse({ status: 201, description: 'Remove one vehicle by id from data base.' })
    removeVehiclesById(@Param('id', ParseIntPipe) id: number): string {
        this.VehiclesService.removeVehiclesById(id)
        return "vehicle with id " + id + " was deleted."
    }

    @Post("update")
    @ApiResponse({ status: 201, description: 'Update one vehicle by id in data base.' })
    async updateVehicles(@Body() body: UpdateVehiclesDtoValidate): Promise<VehiclesDto> {
        return await this.VehiclesService.updateVehicles(body.id, body)
    }

    @Post("/:id/addimage")
    @ApiResponse({ status: 201, description: 'Upload images by vehicle id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files', null, {
        storage: diskStorage({
            destination: './images/vehicles',
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
    addVehiclesImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        let filenames = files.map(file => file.filename);
        return this.VehiclesService.addVehiclesImage(id, filenames)
    }

    @Post("/:id/deleteimage")
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one vehicle image by vehicle id and image name.' })
    removeVehiclesImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): string {
        this.VehiclesService.removeVehiclesImage(id, body.name)
        return "Vehicles image with id " + id + " named " + body.name + " was deleted."
    }

    @Get('images/:imageName')
    @ApiResponse({ status: 201, description: 'Get vehicle image by image name.' })
    async getVehiclesImage(@Param('imageName') imageName: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const file = await this.VehiclesService.getVehiclesImage(imageName);
        res.set({
            'Content-Type': 'image/' + imageName.split('.').pop(),
          });
        return new StreamableFile(file)
    }

}


