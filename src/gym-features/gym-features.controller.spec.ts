import { Test, TestingModule } from '@nestjs/testing';
import { GymFeaturesController } from './gym-features.controller';

describe('GymFeaturesController', () => {
  let controller: GymFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymFeaturesController],
    }).compile();

    controller = module.get<GymFeaturesController>(GymFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
