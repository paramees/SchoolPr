import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from './species.controller';

describe('PeopleController', () => {
  let controller: SpeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
