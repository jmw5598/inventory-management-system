import { Controller, Get, Post, Put, Param, Request, UseGuards, Body, Delete, Query } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { CreateStockroomDto } from '../dtos/create-stockroom.dto';
import { UpdateStockroomDto } from '../dtos/update-stockroom.dto';
import { StockroomsService } from '../services/stockrooms.service';

@Controller('stockrooms')
@UseGuards(JwtAuthenticationGuard)
export class StockroomsController {
  constructor(
    private readonly _stockroomsService: StockroomsService,
  ) {}
  
  @Get()
  public async getStockrooms(@Request() req): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._stockroomsService.getAllStockrooms(accountId);
  }

  @Get('summary')
  public async getStockroomsWithSummary(@Request() req): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._stockroomsService.getAllActiveStockroomsWithOverview(accountId);
  }

  @Get('deleted')
  public async getDeletedStockrooms(@Request() req): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._stockroomsService.getAllDeletedStockrooms(accountId);
  }

  @Post()
  public async createStockroom(
      @Request() req: any, 
      @Body() createStockroomDto: CreateStockroomDto): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._stockroomsService.createNewStockroom(accountId, createStockroomDto);
  }

  @Get(':id')
  public async getStockroomById(
      @Param('id') id: number, @Request() req: any): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._stockroomsService.getStockroomById(accountId, id);
  }

  @Put(':id')
  public async updateStockroom(
      @Param('id') id: number, 
      @Body() updateStockroomDto: UpdateStockroomDto,
      @Request() req): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._stockroomsService.updateStockroom(accountId, id, updateStockroomDto);
  }
  
  @Delete(':id')
  public async deleteStockroom(@Request() req, @Param('id') id: number): Promise<any> {
    const accountId: number = req.user.accountId; 
    return this._stockroomsService.deleteStockroom(accountId, id);
  }
}
