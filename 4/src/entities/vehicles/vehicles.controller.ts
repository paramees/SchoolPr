import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../middleware/auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../middleware/auth/guards/role.guard';
import { Roles } from '../../middleware/roles.decorator';

import { PostVehiclesDtoValidate } from './dto/post.vehicles-validation.dto';
import { UpdateVehiclesDtoValidate } from './dto/update.vehicles-validation.dto';
import { VehiclesDto } from './dto/vehicles.dto';

import { VehiclesService } from './vehicles.service';



@ApiTags("VehiclesApi-CRUD")
@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly VehiclesService: VehiclesService) { }

    @Get()
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return 10 last vehicles in data base.' })
    async getLastTenVehicles(): Promise<VehiclesDto[]> {
        return await this.VehiclesService.getLastTenVehicles()
    }

    @Get("/:id")
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return vehicle by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<VehiclesDto> {
        return await this.VehiclesService.getVehiclesById(id)
    }

    @Post("add")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({type: [PostVehiclesDtoValidate]})
    @ApiResponse({ status: 201, description: 'Add one vehicle to data base.' })
    async addVehicles(@Body(new ParseArrayPipe({ items: PostVehiclesDtoValidate })) vehicles: PostVehiclesDtoValidate[]): Promise<VehiclesDto[]> {
        return await this.VehiclesService.addVehicles(vehicles)
    }

    @Post("delete/:id")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Remove one vehicle by id from data base.' })
    removeVehiclesById(@Param('id', ParseIntPipe) id: number): string {
        this.VehiclesService.removeVehiclesById(id)
        return "vehicle with id " + id + " was deleted."
    }

    @Post("update")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Update one vehicle by id in data base.' })
    async updateVehicles(@Body() body: UpdateVehiclesDtoValidate): Promise<VehiclesDto> {
        return await this.VehiclesService.updateVehicles(body.id, body)
    }

    @Post("/:id/addimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Upload images by vehicle id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files'))
    addVehiclesImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        return this.VehiclesService.addVehiclesImage(id, files)
    }

    @Post("/:id/deleteimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one vehicle image by vehicle id and image name.' })
    async removeVehiclesImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): Promise<string | VehiclesDto> {
        return await this.VehiclesService.removeVehiclesImage(id, body.name)
    }

    @Get('images/:imageName')
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Get vehicle image by image name.' })
    async getVehiclesImage(@Param('imageName') imageName: string, @Res() res: Response) {
        res.attachment(imageName);
        (await this.VehiclesService.getVehiclesImage(imageName)).pipe(res);
    }

}


