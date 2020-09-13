import { Controller, Get, Post, Put, Delete, Request, Query, Body, Param, UseGuards } from '@nestjs/common';
import { Page } from '../../common/models/page.model';
import { PageRequest } from '../../common/models/page-request.model';
import { IPageable } from '../../common/models/pageable.interface';
import { SortDirection } from '../../common/enums/sort-direction.enum';
import { StockItem } from '../entities/stock-item.entity';
import { StockItemsService } from '../services/stock-items.service';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { CreateStockItemDto } from '../dtos/create-stock-item-dto.model';
import { InvLoggerService } from '../../logger/inv-logger.service';

@Controller('stock-items')
@UseGuards(JwtAuthenticationGuard)
export class StockItemsController {
  constructor(
    private readonly _logger: InvLoggerService,
    private readonly _stockItemsService: StockItemsService
  ) {
    this._logger.setContext(this.constructor.name);
  }

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
    try {
      return this._stockItemsService.getByPage(accountId, stockroomId, pageable);
    } catch (error) {
      this._logger.error('Error getting paged stockroom items', error);
    }
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
    try {
      return this._stockItemsService.getByPage(accountId, stockroomId, pageable);
    } catch (error) {
      this._logger.error('Error searching for stock items', error);
    }
  }

  @Post()
  public async createStockItem(@Request() req, @Body() createStockitemDto: CreateStockItemDto): Promise<any> {
    const accountId: number = +req.user.accountId;
    try {
      return this._stockItemsService.createStockItem(accountId, createStockitemDto);
    } catch (error) {
      this._logger.error('Error creating new stock item', error);
    }
  }

  @Put()
  public async updateStockroomItem(@Request() req): Promise<any> {
    return {};
  }
}
