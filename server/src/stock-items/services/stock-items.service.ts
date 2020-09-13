import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductItem } from '../../product-items/entities/product-item.entity';
import { Stockroom } from '../../stockrooms/entities/stockroom.entity';
import { StockItem } from '../entities/stock-item.entity';
import { IPageable } from '../../common/models/pageable.interface';
import { Page } from '../../common/models/page.model';
import { CreateStockItemDto } from '../dtos/create-stock-item-dto.model';
import { create } from 'domain';

@Injectable()
export class StockItemsService {
  constructor(
    @InjectRepository(StockItem)
    public readonly _stockItemRepository: Repository<StockItem>,
    @InjectRepository(Stockroom)
    private readonly _stockroomRepository: Repository<Stockroom>,
    @InjectRepository(ProductItem)
    private readonly _productItemRepository: Repository<ProductItem>
  ) {}

  public async getByPage(accountId: number, stockroomId: number, pageable: IPageable): Promise<Page<StockItem>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const result = await this._stockItemRepository.findAndCount({
      where: { account: { id: accountId }},
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });

    const elements: StockItem[] = result[0];
    const totalElements: number = result[1];

    return {
      elements: elements,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<StockItem>
  }

  public async createStockItem(accountId: number, createStockItem: CreateStockItemDto): Promise<StockItem> {
    const stockroom: Stockroom = await this._stockroomRepository.findOne({ account: { id: accountId }});

    if (!stockroom) {
      throw new UnauthorizedException();
    }

    const productItem: ProductItem = await this._verifyOrCreateProductItem(accountId, createStockItem.productItem);

    const stockItem: StockItem = this._stockItemRepository.create({
      purchaseDate: createStockItem.purchaseDate,
      purchasePrice: createStockItem.purchasePrice,
      quantity: createStockItem.quantity,
      itemCondition: { id: createStockItem.itemConditionId },
      stockroom: stockroom,
      location: { id: createStockItem.locationId },
      productItem: productItem
    }); 

    return this._stockItemRepository.save(stockItem); 
  }

  private async _verifyOrCreateProductItem(accountId: number, productItem: ProductItem): Promise<ProductItem> {
    let resultProductItem: ProductItem;
    if (productItem.id) {
      resultProductItem = await this._productItemRepository.findOne(productItem.id);
    } else {
      const newProductItem: ProductItem = this._productItemRepository.create({
        title: productItem.title,
        description: productItem.description,
        sku: productItem.sku,
        make: productItem.make,
        model: productItem.model,
        category: { id: productItem.category.id },
        account: { id: accountId }
      });
      resultProductItem = await this._productItemRepository.save(newProductItem);
    }
    return resultProductItem;
  }
}
