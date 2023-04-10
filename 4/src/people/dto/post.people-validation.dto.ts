import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsArray, IsNotEmpty, IsNumberString } from 'class-validator';

export class PostPeopleDtoValidate {
	
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
    name: string;

	@IsNumberString()
	@ApiProperty()
	@IsNotEmpty()
	height: number;

	@IsNumberString()
	@ApiProperty()
	@IsNotEmpty()
	mass: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	hair_color: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	skin_color: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	eye_color: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	birth_year: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	gender: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	homeworld: string;

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	films: string[]; //urls

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	species: string[]; //urls

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	vehicles: string[]; //urls

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	starships: string[]; //urls

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