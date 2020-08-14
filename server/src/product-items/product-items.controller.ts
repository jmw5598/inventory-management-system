import { Controller, Body, UseGuards, Get, Post, Request, Query, Put, Param, Delete } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { ProductItemsService } from './product-items.service';
import { ProductItem } from './entities/product-item.entity';

import { IPageable } from '../common/models/pageable.interface';
import { Page } from '../common/models/page.model';
import { PageRequest } from '../common/models/page-request.model';
import { SortDirection } from '../common/enums/sort-direction.enum';
import { CreateProductItemDto } from './dtos/create-product-item.dto';
import { UpdateProductItemDto } from './dtos/update-product-item.dto';

@Controller('product-items')
@UseGuards(JwtAuthenticationGuard)
export class ProductItemsController {
  constructor(
    private readonly _productItemsService: ProductItemsService
  ) {}

  @Get()
  public async getAllProductItems(
      @Request() req,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'id',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING): Promise<Page<ProductItem>> {
    const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
    const accountId: number = req.user.accountId;
    return this._productItemsService.findAllByPage(accountId, pageable);  
  }

  @Get('search')
  public async serachProductItems(
      @Request() req,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'title',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<ProductItem>> {
    const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
    const accountId: number = req.user.accountId;
    return this._productItemsService.searchProductItems(accountId, searchTerm, pageable);  
  }

  @Post()
  public async createNewProductItem(
      @Request() req, 
      @Body() createProductItemDto: CreateProductItemDto): Promise<any> {
    const accountId: number = req.user.accountId;
    return this._productItemsService.createNewProductItem(accountId, createProductItemDto);
  }

  @Get(':id')
  public async getProductItemById(
      @Request() req, 
      @Param('id') id: number): Promise<ProductItem> {
    const accountId: number = req.user.accountId;
    return this._productItemsService.getProductItemById(accountId, id);
  }

  @Put(':id')
  public async updateProductItem(
      @Request() req, 
      @Param('id') id: number, 
      @Body() updateProductItemDto: UpdateProductItemDto): Promise<ProductItem> {
    const accountId: number = req.user.accountId;
    console.log("Controller ", updateProductItemDto);
    return this._productItemsService.updateProductItem(accountId, id, updateProductItemDto);
  }

  @Delete(':id')
  public async deleteProductItem(
      @Request() req,
      @Param('id') id: number): Promise<ProductItem> {
    const accountId: number = req.user.accountId;
    return this._productItemsService.deleteProductItem(accountId, id);
  }
}
