import { Controller, Get, Post, Put, Param, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stockroom } from './entities/stockroom.entity';
import { Item } from '../items/entities/item.entity';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('stockrooms')
@UseGuards(JwtAuthenticationGuard)
export class StockroomsController {
  constructor(
    @InjectRepository(Stockroom)
    private readonly stockroomRepository: Repository<Stockroom>,
    @InjectRepository(Item)
    private readonly stockroomItemRepository: Repository<Item>
  ) {}
  
  @Get()
  public async getStockrooms(@Request() req): Promise<any> {
    console.log("users id is... ", req.user);
    return this.stockroomRepository.find();
  }

  @Post()
  public async createStockroom(): Promise<any> {
    return {};
  }

  @Get(':id')
  public async getStockroomById(@Param('id') id: number): Promise<any> {
    const stockroom: Stockroom =  await this.stockroomRepository.findOne(id);
    if (!stockroom) {
      throw new NotFoundException();
    }
    return stockroom;
  }

  @Put(':id')
  public async updateStockroom(
      @Param('id') id: number): Promise<any> {
    return {};
  }  

  @Get(':id/items')
  public async getStockroomItems(
      @Param('id') id: number): Promise<any> {
    return [];
  }
}
