import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Page } from '../common/models/page.model';

import { ProductItemNotFoundException } from './exceptions/product-item-not-found.exception';
import { ProductItem } from './entities/product-item.entity'
import { IPageable } from '../common/models/pageable.interface';
import { CreateProductItemDto } from './dtos/create-product-item.dto';
import { UpdateProductItemDto } from './dtos/update-product-item.dto';

@Injectable()
export class ProductItemsService {
  constructor(
    @InjectRepository(ProductItem)
    private readonly _productItemRepository: Repository<ProductItem>
  ) {}

  public async findAllByPage(accountId: number, pageable: IPageable): Promise<Page<ProductItem>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const result = await this._productItemRepository.findAndCount({ 
      relations: ['category'],
      where: { account: { id: accountId } },
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });

    const elements: ProductItem[] = result[0];
    const totalElements: number = result[1];

    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<ProductItem>;
  }

  public async getProductItemById(accountId: number, productItemId: number): Promise<ProductItem> {
    const productItem: ProductItem = await this._findProductItemByIdWithAccountId(accountId, productItemId);
    if (!productItem) throw new ProductItemNotFoundException();
    return productItem;
  }
  
  public async searchProductItems(accountId: number, searchTerm: string): Promise<ProductItem[]> {
    // @@@ TODO - find where title, description,  sku ilike search terms limit 10
    return null;
  }

  public async createNewProductItem(accountId: number, createProductItemDto: CreateProductItemDto): Promise<ProductItem> {
    const productItem: ProductItem = this._productItemRepository.create({
      ...createProductItemDto,
      accountId: accountId
    });
    return this._productItemRepository.save(productItem);
  }

  public async updateProductItem(accountId: number, productItemId: number, updateProductItemDto: UpdateProductItemDto): Promise<ProductItem> {
    const productItem: ProductItem = await this._findProductItemByIdWithAccountId(accountId, productItemId);
    if (!productItem) throw new ProductItemNotFoundException();

    // TODO Patch dto values into product item
    // Save product item
    
    return null;
  }

  public async deleteProductItem(accountId: number, productItemId: number): Promise<ProductItem> {
    const productItem:  ProductItem = await this._findProductItemByIdWithAccountId(accountId, productItemId);
    if (!productItem) throw new ProductItemNotFoundException();
    this._productItemRepository.delete(productItemId);
    return productItem;
  }

  private _findProductItemByIdWithAccountId(accountId: number, productItemId: number): Promise<ProductItem> {
    return this._productItemRepository.findOne({
      id: productItemId,
      account: { id: accountId }
    });
  }
}
