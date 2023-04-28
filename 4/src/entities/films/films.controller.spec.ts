import { Test } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService

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
  }];

  const mockService = {
    addFilms: (el) => { return [{...el[0], id: 5, charactersObjs: [], speciesObjs: [], vehiclesObjs: [], starshipsObjs: [], planetsObjs: [], image_names: []}]},
    updateFilms: (id, el) => {
      let film = filmEntity[0];
      Object.assign(film, el)
      return Promise.resolve(film) 
    }
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService]
    }).overrideProvider(FilmsService).useValue(mockService).compile();

    service = module.get<FilmsService>(FilmsService);
    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addFilms', () => {
    it('should return an array of added films', async () => {
      const result = filmEntity;
      const input = filmDto;
      delete input[0].id
      expect(await controller.addFilms(input)).toStrictEqual(result);
    });
  });

  describe('updateFilms', () => {
    it('should return an updated film', async () => {
      const result = filmEntity[0];
      const input = filmDto[0];
      input.director = "Messsss"
      expect((await controller.updateFilms(input))).toStrictEqual({...result, director: "Messsss"});
    });
  });
});
