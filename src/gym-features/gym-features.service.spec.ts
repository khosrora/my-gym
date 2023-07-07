import { Test, TestingModule } from '@nestjs/testing';
import { GymFeaturesService } from './gym-features.service';

describe('GymFeaturesService', () => {
  let service: GymFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GymFeaturesService],
    }).compile();

    service = module.get<GymFeaturesService>(GymFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
