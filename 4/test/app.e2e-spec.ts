import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { AppModule } from './../src/app.module';
import { AllExceptionsFilter } from '../src/middleware/exception.filter';
import { TransformInterceptor } from '../src/middleware/transform.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let userToken: string;
  let adminToken: string;
  let addedId: number;
  let addedImage: string;


  const film13dto = {
    "title": "The Phantom Menace",
    "episode_id": 1,
    "opening_crawl": "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....",
    "director": "George Lucas",
    "producer": "Rick McCallum",
    "release_date": "1999-05-19",
    "characters": [
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/3/",
      "https://swapi.dev/api/people/10/",
      "https://swapi.dev/api/people/11/",
      "https://swapi.dev/api/people/16/",
      "https://swapi.dev/api/people/20/",
      "https://swapi.dev/api/people/21/",
      "https://swapi.dev/api/people/32/",
      "https://swapi.dev/api/people/33/",
      "https://swapi.dev/api/people/34/",
      "https://swapi.dev/api/people/35/",
      "https://swapi.dev/api/people/36/",
      "https://swapi.dev/api/people/37/",
      "https://swapi.dev/api/people/38/",
      "https://swapi.dev/api/people/39/",
      "https://swapi.dev/api/people/40/",
      "https://swapi.dev/api/people/41/",
      "https://swapi.dev/api/people/42/",
      "https://swapi.dev/api/people/43/",
      "https://swapi.dev/api/people/44/",
      "https://swapi.dev/api/people/46/",
      "https://swapi.dev/api/people/47/",
      "https://swapi.dev/api/people/48/",
      "https://swapi.dev/api/people/49/",
      "https://swapi.dev/api/people/50/",
      "https://swapi.dev/api/people/51/",
      "https://swapi.dev/api/people/52/",
      "https://swapi.dev/api/people/53/",
      "https://swapi.dev/api/people/54/",
      "https://swapi.dev/api/people/55/",
      "https://swapi.dev/api/people/56/",
      "https://swapi.dev/api/people/57/",
      "https://swapi.dev/api/people/58/",
      "https://swapi.dev/api/people/59/"
    ],
    "species": [
      "https://swapi.dev/api/species/1/",
      "https://swapi.dev/api/species/2/",
      "https://swapi.dev/api/species/6/",
      "https://swapi.dev/api/species/11/",
      "https://swapi.dev/api/species/12/",
      "https://swapi.dev/api/species/13/",
      "https://swapi.dev/api/species/14/",
      "https://swapi.dev/api/species/15/",
      "https://swapi.dev/api/species/16/",
      "https://swapi.dev/api/species/17/",
      "https://swapi.dev/api/species/18/",
      "https://swapi.dev/api/species/19/",
      "https://swapi.dev/api/species/20/",
      "https://swapi.dev/api/species/21/",
      "https://swapi.dev/api/species/22/",
      "https://swapi.dev/api/species/23/",
      "https://swapi.dev/api/species/24/",
      "https://swapi.dev/api/species/25/",
      "https://swapi.dev/api/species/26/",
      "https://swapi.dev/api/species/27/"
    ],
    "vehicles": [
      "https://swapi.dev/api/vehicles/33/",
      "https://swapi.dev/api/vehicles/34/",
      "https://swapi.dev/api/vehicles/35/",
      "https://swapi.dev/api/vehicles/36/",
      "https://swapi.dev/api/vehicles/37/",
      "https://swapi.dev/api/vehicles/38/",
      "https://swapi.dev/api/vehicles/42/"
    ],
    "starships": [
      "https://swapi.dev/api/starships/31/",
      "https://swapi.dev/api/starships/32/",
      "https://swapi.dev/api/starships/39/",
      "https://swapi.dev/api/starships/40/",
      "https://swapi.dev/api/starships/41/"
    ],
    "planets": [
      "https://swapi.dev/api/planets/1/",
      "https://swapi.dev/api/planets/8/",
      "https://swapi.dev/api/planets/9/"
    ],
    "created": "2014-12-19T16:52:55.740000Z",
    "edited": "2014-12-20T10:54:07.216000Z",
    "url": "https://swapi.dev/api/films/4/"
  }

  const film13entity = { ...film13dto, "image_names": [], "charactersObjs": [], "starshipsObjs": [], "vehiclesObjs": [], "speciesObjs": [], "planetsObjs": [], "id": 13 }


  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  it('/films/13 (GET) Unauthorized', () => {
    return request(app.getHttpServer())
      .get('/films/13')
      .expect(401)
      .expect({ statusCode: 401, message: "Unauthorized" });
  });

  describe('/auth/login (POST)', () => {
    it('/auth/login (POST) get user token', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          "username": "string2",
          "password": "string"
        })
        .expect(200)

      const token = res.body.data.access_token
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');

      userToken = token;
    })
  });

  it('/films/add (Post) user role Unauthorized', () => {
    return request(app.getHttpServer())
      .post('/films/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send([film13dto])
      .expect(403)
      .expect({ statusCode: 403, message: "Forbidden resource", error: "Forbidden" });
  });

  it('/films/13 (GET) user OK', () => {
    return request(app.getHttpServer())
      .get('/films/13')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)
      .expect({ data: film13entity });
  });

  describe('/auth/login (POST)', () => {
    it('/auth/login (POST) get admin token', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          "username": "string",
          "password": "string"
        })
        .expect(200)

      const token = res.body.data.access_token
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');

      adminToken = token;
    })
  });

  describe('/auth/login (POST)', () => {
    it('/films/add (Post) admin role', async () => {
      const res = await request(app.getHttpServer())
        .post('/films/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send([film13dto])
        .expect(201);

      addedId = Number(res.body.data[0].id);
      const result = film13entity;

      result.id = addedId;

      res.body.data[0].charactersObjs = [];
      res.body.data[0].starshipsObjs = [];
      res.body.data[0].planetsObjs = [];
      res.body.data[0].speciesObjs = [];
      res.body.data[0].vehiclesObjs = [];
      expect(res.body.data[0]).toStrictEqual(film13entity);

      console.log(addedId)
    })
  });

  it('/films/delete/id (GET) admin OK', () => {
    return request(app.getHttpServer())
      .post('/films/delete/' + addedId)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(201)
      .expect({ data: "film with id " + addedId + " was deleted." });
  });

  describe('/films/16/addimage (POST) Unauthorized', () => {
    it('/films/16/addimage (POST) Unauthorized', () => {
      return request(app.getHttpServer())
        .post('/films/16/addimage')
        .expect(401)
        .expect({ statusCode: 401, message: "Unauthorized" });
    });
  });

  describe('/films/16/addimage (POST) admin OK', () => {
    it('/films/16/addimage (POST) admin OK', async () => {
      const imageData = fs.readFileSync('test/test.jpg');
      const res = await request(app.getHttpServer())
        .post('/films/16/addimage')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('files', imageData, {filename: 'test.jpg', contentType: 'multipart/form-data'})
        .expect(201);
        
        addedImage = res.body.data.image_names[0];
        console.log(addedImage)
        expect(res.body.data.image_names[0]).toBeDefined();
    });
  });

  describe('/films/16/deleteimage (POST) admin OK', () => {
    it('/films/16/deleteimage (POST) admin OK', async () => {
      const res = await request(app.getHttpServer())
        .post('/films/16/deleteimage')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({name: addedImage})
        .expect(201);
        
        expect(res.body.data.image_names.includes(addedImage)).toBe(false);
    });
  });


  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });
});
