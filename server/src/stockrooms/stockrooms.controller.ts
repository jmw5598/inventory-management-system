import { Controller, Get, Post, Put, Param, NotFoundException, Request, UseGuards, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';

import { Account } from '../accounts/entities/account.entity';
import { Stockroom } from './entities/stockroom.entity';
import { Item } from '../items/entities/item.entity';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { CreateStockroomDto } from './dtos/create-stockroom.dto';
import { UpdateStockroomDto } from './dtos/update-stockroom.dto';

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
    const accountId: number = req.user.accountId;
    return this.stockroomRepository.find({
      where: { account: { id: accountId }, deletedAt: IsNull() }
    });
  }

  @Get('deleted')
  public async getDeletedStockrooms(@Request() req): Promise<any> {
    const accountId: number = req.user.accountId;
    return this.stockroomRepository.find({
      where: { account: { id: accountId }, deletedAt: Not(IsNull()) }
    });
  }

  @Post()
  public async createStockroom(
    @Request() req: any, 
    @Body() createStockroomDto: CreateStockroomDto): Promise<any> {
    
    const accountId: number = req.user.accountId;
    const stockroom: Stockroom = this.stockroomRepository.create({
      name: createStockroomDto.name,
      description: createStockroomDto.description,
      account: { id: accountId }
    });
    return this.stockroomRepository.save(stockroom);
  }

  @Get(':id')
  public async getStockroomById(
    @Param('id') id: number, @Request() req: any): Promise<any> {
    
    const accountId: number = req.user.accountId;
    const stockroom: Stockroom =  await this.stockroomRepository.findOne({
      id: id, account: { id: accountId }
    });

    if (!stockroom) throw new NotFoundException();
    
    return stockroom;
  }

  @Put(':id')
  public async updateStockroom(
      @Param('id') id: number, @Body() updateStockroomDto: UpdateStockroomDto): Promise<any> {
    const stockroom: Stockroom = await this.stockroomRepository.findOne(id);
    stockroom.name = updateStockroomDto.name;
    stockroom.description = updateStockroomDto.description;
    return this.stockroomRepository.save(stockroom);
  }
  
  @Delete(':id')
  public async deleteStockroom(@Request() req, @Param('id') id: number): Promise<any> {
    const accountId: number = req.user.accountId; 
    const stockroom: Stockroom = await this.stockroomRepository.findOne({ id: id, account: { id: accountId } });

    if (!stockroom) { throw new NotFoundException() }

    stockroom.deletedAt = new Date();

    this.stockroomRepository.save(stockroom);
    return stockroom;
  }

  @Get(':id/items')
  public async getStockroomItems(
      @Param('id') id: number): Promise<any> {
    return [];
  }
}
