import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class PostFilmsDtoValidate {
	
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
    title: string;

	@IsNumber()
	@ApiProperty()
	@IsNotEmpty()
	episode_id: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	opening_crawl: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	director: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	producer: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	release_date: string;

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	characters: string[]; //urls

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

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	planets: string[]; //urls

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