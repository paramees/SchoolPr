import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class IdValidate {
	@ApiProperty()
	@IsNumber()
	id: number;
}