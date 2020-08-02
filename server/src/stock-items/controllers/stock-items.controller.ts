import { Controller, Get, Post, Put, Delete, Request, Query, Body, Param, UseGuards } from '@nestjs/common';
import { Page } from '../../common/models/page.model';
import { PageRequest } from '../../common/models/page-request.model';
import { IPageable } from '../../common/models/pageable.interface';
import { SortDirection } from '../../common/enums/sort-direction.enum';
import { StockItem } from '../entities/stock-item.entity';
import { StockItemsService } from '../services/stock-items.service';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';

@Controller('stock-items')
@UseGuards(JwtAuthenticationGuard)
export class StockItemsController {
  constructor(
    private readonly _stockItemsService: StockItemsService
  ) {}

  @Get()
  public async getStockroomItems(
    @Request() req,
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('sortCol') sortCol: string = 'id',
    @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING
  ): Promise<Page<StockItem>> {
    const stockroomId: number = +id;
    const accountId: number = +req.user.accountId;
    const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir);
    return this._stockItemsService.getByPage(accountId, stockroomId, pageable);
  }

  @Get('search')
  public async searchStockItems(
    @Request() req,
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('sortCol') sortCol: string = 'id',
    @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING
  ): Promise<Page<StockItem>> {
    const stockroomId: number = +id;
    const accountId: number = +req.user.accountId;
    const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir);
    return this._stockItemsService.getByPage(accountId, stockroomId, pageable);
  }

  @Post()
  public async createStockItem(@Request() req): Promise<any> {
    return {};
  }

  @Put()
  public async updateStockroomItem(@Request() req): Promise<any> {
    return {};
  }
}
