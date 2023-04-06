import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarshipsEntity } from './entity/starships.entity';
import { ReadStream, createReadStream, unlink } from 'fs';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(StarshipsEntity)
    private starshipsRepository: Repository<StarshipsEntity>,
  ) { }

  getLastTenStarships(): Promise<StarshipsEntity[]> {
    return this.starshipsRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  getStarshipsById(id: number): Promise<StarshipsEntity> | null {
    return this.starshipsRepository.findOneBy({ id });
  }

  async addStarships(starship: Partial<StarshipsEntity>): Promise<StarshipsEntity> {
    if (!starship.image_names) starship.image_names = [];
    return await this.starshipsRepository.save(starship);
  }

  async removeStarshipsById(id: number): Promise<void> {
    await this.starshipsRepository.delete(id);
  }

  async updateStarships(id: number, starshipUpd: Partial<StarshipsEntity>): Promise<StarshipsEntity> | null {
    let starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      return null;
    }
    Object.assign(starship, starshipUpd);
    return this.starshipsRepository.save(starship);
  }

  async addStarshipsImage(id: number, filenames: string[]): Promise<string | StarshipsEntity> {
    let starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      return "no starships with id: " + id;
    }
    filenames.forEach(el => starship.image_names.push(el));
    return await this.starshipsRepository.save(starship);
  }

  async removeStarshipsImage(id: number, name: string): Promise<string | StarshipsEntity> {
    let starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      return "no starships with id: " + id;
    }
    starship.image_names.filter(el => el !== name);

    unlink(__dirname.replace('dist\\src', 'images') + '\\' + name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.starshipsRepository.save(starship);
  }

  async getStarshipsImage(name: string): Promise<ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
