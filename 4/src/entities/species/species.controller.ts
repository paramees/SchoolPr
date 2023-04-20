import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

import { SpeciesDto } from './dto/species.dto';
import { PostSpeciesDtoValidate } from './dto/post.species-validation.dto';
import { UpdateSpeciesDtoValidate } from './dto/update.species-validation.dto';

import { SpeciesService } from './species.service';
import { JwtAuthGuard } from 'src/middleware/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/middleware/auth/guards/role.guard';
import { Roles } from 'src/middleware/roles.decorator';


@ApiTags("SpeciesApi-CRUD")
@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) { }

    @Get()
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return 10 last species in data base.' })
    async getLastTenSpecies(): Promise<SpeciesDto[]> {
        return await this.speciesService.getLastTenSpecies()
    }

    @Get("/:id")
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return specie by id in data base.' })
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<SpeciesDto> {
        return await this.speciesService.getSpeciesById(id)
    }

    @Post("add")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({type: [PostSpeciesDtoValidate]})
    @ApiResponse({ status: 201, description: 'Add one specie to data base.' })
    async addSpecies(@Body(new ParseArrayPipe({ items: PostSpeciesDtoValidate })) Specie: PostSpeciesDtoValidate[]): Promise<SpeciesDto[]> {
        return await this.speciesService.addSpecies(Specie)
    }

    @Post("delete/:id")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Remove one specie by id from data base.' })
    removeSpeciesById(@Param('id', ParseIntPipe) id: number): string {
        this.speciesService.removeSpeciesById(id)
        return "Specie with id " + id + " was deleted."
    }

    @Post("update")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Update one specie by id in data base.' })
    async updateSpecies(@Body() body: UpdateSpeciesDtoValidate): Promise<SpeciesDto> {
        return await this.speciesService.updateSpecies(body.id, body)
    }

    @Post("/:id/addimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Upload images by specie id' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
    @UseInterceptors(FilesInterceptor('files'))
    addSpeciesImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        return this.speciesService.addSpeciesImage(id, files)
    }

    @Post("/:id/deleteimage")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ schema: { type: 'object', properties: {name: {type: 'string'}}}})
    @ApiResponse({ status: 201, description: 'Remove one specie image by specie id and image name.' })
    async removeSpeciesImage(@Param('id', ParseIntPipe) id: number, @Body() body: {name: string}): Promise<string | SpeciesDto> {
        return await this.speciesService.removeSpeciesImage(id, body.name)
    }

    @Get('images/:imageName')
    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Get specie image by image name.' })
    async getSpeciesImage(@Param('imageName') imageName: string, @Res() res: Response) {
        res.attachment(imageName);
        (await this.speciesService.getSpeciesImage(imageName)).pipe(res);
    }

}


