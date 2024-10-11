import { Test, TestingModule } from '@nestjs/testing';
import { BikeRepository } from './bike.repository';

describe('BikeService', () => {
  let service: BikeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BikeRepository],
    }).compile();

    service = module.get<BikeRepository>(BikeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
