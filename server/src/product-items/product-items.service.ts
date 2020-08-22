import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository, Raw, IsNull } from 'typeorm';
import { Page } from '../common/models/page.model';

import { Category } from '../categories/entities/category.entity';
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
      where: { account: { id: accountId }, deletedAt: IsNull() },
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });
    const elements: ProductItem[] = result[0];
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  public async getProductItemById(accountId: number, productItemId: number): Promise<ProductItem> {
    const productItem: ProductItem = await this._findProductItemByIdWithAccountId(accountId, productItemId);
    if (!productItem) throw new ProductItemNotFoundException();
    return productItem;
  }
  
  public async searchProductItems(accountId: number, searchTerm: string, pageable: IPageable): Promise<Page<ProductItem>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const where = await this._generateSearchWhereClause(accountId, searchTerm);
    const result = await this._productItemRepository.findAndCount({ 
      relations: ['category'],
      where: where,
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });
    const elements: ProductItem[] = result[0];
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  public async createNewProductItem(accountId: number, createProductItemDto: CreateProductItemDto): Promise<ProductItem> {
    const productItem: ProductItem = this._productItemRepository.create({
      title: createProductItemDto.title,
      description: createProductItemDto.description,
      sku: createProductItemDto.sku || null,
      make: createProductItemDto.make || null,
      model: createProductItemDto.model || null,
      category: createProductItemDto.category,
      accountId: accountId
    });
    return this._productItemRepository.save(productItem);
  }

  public async updateProductItem(accountId: number, productItemId: number, updateProductItemDto: UpdateProductItemDto): Promise<ProductItem> {
    let productItem: ProductItem = await this._findProductItemByIdWithAccountId(accountId, productItemId);
    if (!productItem) throw new ProductItemNotFoundException();
    productItem.title = updateProductItemDto.title
    productItem.description = updateProductItemDto.description;
    productItem.sku = updateProductItemDto.sku || null;
    productItem.make = updateProductItemDto.make || null;
    productItem.model = updateProductItemDto.model || null;
    productItem.category = updateProductItemDto.category as Category
    productItem.updatedAt = new Date();
    this._productItemRepository.save(productItem);
    return productItem;
  }

  public async deleteProductItem(accountId: number, productItemId: number): Promise<ProductItem> {
    const productItem:  ProductItem = await this._findProductItemByIdWithAccountId(accountId, productItemId);
    if (!productItem) throw new ProductItemNotFoundException();
    productItem.deletedAt = new Date();
    this._productItemRepository.save(productItem);
    return productItem;
  }

  private async _generateSearchWhereClause(accountId: number, searchTerm: string): Promise<any> {
    const ilike = Raw(alias => `${alias} ILIKE '%${searchTerm.replace("/\s/g", "%")}%'`)
    return [
      { title: ilike, account: { id: accountId }, deletedAt: IsNull() },
      { description: ilike, account: { id: accountId }, deletedAt: IsNull() },
      { make: ilike, account: { id: accountId }, deletedAt: IsNull() },
      { model: ilike, account: { id: accountId }, deletedAt: IsNull() },
      { sku: ilike, account: { id: accountId }, deletedAt: IsNull() }
    ];
  }

  private async _generatePageResult(elements: ProductItem[], totalElements: number, pageable: IPageable): Promise<Page<ProductItem>> {
    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<ProductItem>;
  }

  private _findProductItemByIdWithAccountId(accountId: number, productItemId: number): Promise<ProductItem> {
    return this._productItemRepository.findOne({
      id: productItemId,
      account: { id: accountId }
    }, { relations: ['category'] });
  }
}
