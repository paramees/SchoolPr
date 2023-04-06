import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class PostSpeciesDtoValidate {

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	classification: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	designation: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	average_height: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	average_lifespan: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	eye_colors: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	hair_colors: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	skin_colors: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	language: string;

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
	people: string[]; //urls

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