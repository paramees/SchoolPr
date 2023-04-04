import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourseOptions } from 'db/data-sourse';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';


@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot(dataSourseOptions),
    PeopleModule,
    FilmsModule,
    StarshipsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
