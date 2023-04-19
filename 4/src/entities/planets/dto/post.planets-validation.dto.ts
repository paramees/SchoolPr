import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class PostPlanetsDtoValidate {
	
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
    name: string;
	
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	diameter : string

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	rotation_period : string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	orbital_period: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	gravity : string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	population : string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	climate : string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	terrain : string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	surface_water: string;

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	films: string[]; //urls

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	residents: string[]; //urls

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	created: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	edited: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	url: string;
}