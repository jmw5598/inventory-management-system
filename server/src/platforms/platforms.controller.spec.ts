import { Test, TestingModule } from '@nestjs/testing';
import { PlatformsController } from './platforms.controller';

describe('Platforms Controller', () => {
  let controller: PlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformsController],
    }).compile();

    controller = module.get<PlatformsController>(PlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
