import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsEntity } from './entity/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipsEntity])],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule { }
