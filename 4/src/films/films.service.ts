import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsEntity } from './entity/films.entity';
import fs, { createReadStream } from 'fs';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
  ) { }

  getLastTenFilms(): Promise<FilmsEntity[]> {
    return this.filmsRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  getFilmsById(id: number): Promise<FilmsEntity> | null {
    return this.filmsRepository.findOneBy({ id });
  }

  async addFilms(films: Partial<FilmsEntity>): Promise<FilmsEntity> {
    if (!films.image_names) films.image_names = [];
    return await this.filmsRepository.save(films);
  }

  async removeFilmsById(id: number): Promise<void> {
    await this.filmsRepository.delete(id);
  }

  async updateFilms(id: number, filmsUpd: Partial<FilmsEntity>): Promise<FilmsEntity> | null {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return null;
    }
    Object.assign(films, filmsUpd);
    return this.filmsRepository.save(films);
  }

  async addFilmsImage(id: number, filenames: string[]): Promise<string | FilmsEntity> {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return "no films with id: " + id;
    }
    filenames.forEach(el => films.image_names.push(el));
    return await this.filmsRepository.save(films);
  }

  async removeFilmsImage(id: number, name: string): Promise<string | FilmsEntity> {
    let films = await this.filmsRepository.findOneBy({ id });
    if (!films) {
      return "no films with id: " + id;
    }
    films.image_names = films.image_names.filter(el => el !== name);

    fs.unlink(name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return await this.filmsRepository.save(films);
  }

  async getFilmsImage(name: string): Promise<fs.ReadStream> {
    return createReadStream(__dirname.replace('dist\\src', 'images') + '\\' + name);
  }

}
