import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Hello world!')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello world!' })
  @ApiResponse({ status: 200, description: 'Return "Hello world!"'})
  getHello(): string {
    return this.appService.getHello();
  }
}
