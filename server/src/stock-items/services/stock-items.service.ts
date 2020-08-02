import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockItem } from '../entities/stock-item.entity';
import { Repository } from 'typeorm';

import { IPageable } from '../../common/models/pageable.interface';
import { Page } from '../../common/models/page.model';

@Injectable()
export class StockItemsService {
  constructor(
    @InjectRepository(StockItem)
    public readonly _stockItemRepository: Repository<StockItem>
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
}
