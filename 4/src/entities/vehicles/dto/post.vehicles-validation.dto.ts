import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class PostVehiclesDtoValidate {
	
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
    name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	vehicle_class: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	manufacturer: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	cost_in_credits: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	length: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	crew: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	passengers: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	max_atmosphering_speed: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	cargo_capacity: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	consumables: string;

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	films: string[]; //urls

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ApiProperty()
	pilots: string[]; //urls

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