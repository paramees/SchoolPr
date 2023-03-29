import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourseOptions } from 'db/data-sourse';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';


@Module({
  imports: [ConfigModule.forRoot(),
          TypeOrmModule.forRoot(dataSourseOptions),
          PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
