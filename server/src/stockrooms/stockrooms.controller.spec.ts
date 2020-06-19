import { Test, TestingModule } from '@nestjs/testing';
import { StockroomsController } from './stockrooms.controller';

describe('Stockrooms Controller', () => {
  let controller: StockroomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockroomsController],
    }).compile();

    controller = module.get<StockroomsController>(StockroomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
