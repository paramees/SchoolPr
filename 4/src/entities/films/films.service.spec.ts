import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilmsEntity } from './entity/films.entity';
import { PeopleEntity } from '../people/entity/people.entity';
import { SpeciesEntity } from '../species/entity/species.entity';
import { PlanetsEntity } from '../planets/entity/planets.entity';
import { VehiclesEntity } from '../vehicles/entity/vehicles.entity';
import { ImagesService } from '../../middleware/images_aws/images.service';
import { StarshipsEntity } from '../starships/entity/starships.entity';
import { Repository } from 'typeorm';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: Repository<FilmsEntity>;

    const filmDto = [{
    id: 5,
    title: "A New Hope",
		episode_id: 4,
		opening_crawl: "It is a period of civil war.",
		director: "George Lucas",
		producer: "Gary Kurtz, Rick McCallum",
		release_date: "1977-05-25",
		characters: ["https://swapi.dev/api/people/1/"],
		planets: ["https://swapi.dev/api/planets/3/"],
		starships: ["https://swapi.dev/api/starships/13/"],
		vehicles: ["https://swapi.dev/api/vehicles/8/"],
		species: ["https://swapi.dev/api/species/5/"],
		created: "2014-12-10T14:23:31.880000Z",
	  edited: "2014-12-20T19:49:45.256000Z",
		url: "https://swapi.dev/api/films/1/"
  }]

  const filmEntity = [{
    id: 5,
    title: "A New Hope",
		episode_id: 4,
		opening_crawl: "It is a period of civil war.",
		director: "George Lucas",
		producer: "Gary Kurtz, Rick McCallum",
		release_date: "1977-05-25",
		characters: ["https://swapi.dev/api/people/1/"],
		planets: ["https://swapi.dev/api/planets/3/"],
		starships: ["https://swapi.dev/api/starships/13/"],
		vehicles: ["https://swapi.dev/api/vehicles/8/"],
		species: ["https://swapi.dev/api/species/5/"],
		created: "2014-12-10T14:23:31.880000Z",
	  edited: "2014-12-20T19:49:45.256000Z",
		url: "https://swapi.dev/api/films/1/",
    charactersObjs: [],
    speciesObjs: [],
    vehiclesObjs: [],
    starshipsObjs: [],
    planetsObjs: [],
    image_names: []
  }]

  const mockFilmRep = {
    findOne: (el => Promise.resolve(filmEntity[0])),
    findOneBy: (el => Promise.resolve(filmEntity[0])),
    save: (el => Promise.resolve({...el, charactersObjs: [], speciesObjs: [], vehiclesObjs: [], starshipsObjs: [], planetsObjs: [], image_names: []}))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService, FilmsService, 
        {provide: getRepositoryToken(FilmsEntity), useValue: mockFilmRep},
        {provide: getRepositoryToken(PeopleEntity), useValue: {}},
        {provide: getRepositoryToken(VehiclesEntity), useValue: {}},
        {provide: getRepositoryToken(SpeciesEntity), useValue: {}},
        {provide: getRepositoryToken(PlanetsEntity), useValue: {}},
        {provide: getRepositoryToken(StarshipsEntity), useValue: {}},
      ],
    }).overrideProvider(ImagesService).useValue({}).compile();

    service = module.get<FilmsService>(FilmsService);
    repository = module.get<Repository<FilmsEntity>>(getRepositoryToken(FilmsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a film obj', async () => {
      const result = filmEntity;
      expect(await service.getFilmsById(filmDto[0].id)).toBe(result[0]);
    });
  });

  // describe('update', () => {
  //   it('should return a film obj', async () => {
  //     let income = filmDto[0];
  //     let id = income.id
  //     let result = filmEntity
  //     expect(await service.updateFilms(id, income)).toBe(result);
  //   });
  // });
});
