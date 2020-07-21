import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';

import { Stockroom } from './entities/stockroom.entity';
import { StockroomSummary } from './dtos/stockroom-summary.dto';
import { StockroomMapper } from './mappers/stockroom.mapper';
import { CreateStockroomDto } from './dtos/create-stockroom.dto';
import { UpdateStockroomDto } from './dtos/update-stockroom.dto';

@Injectable()
export class StockroomsService {
  constructor(
    @InjectRepository(Stockroom)
    private readonly _stockroomRepository: Repository<Stockroom>
  ) {}

  public async getAllStockrooms(accountId: number): Promise<Stockroom[]> {
    return this._stockroomRepository.find({
      where: { account: { id: accountId }, deletedAt: IsNull() }
    });
  }

  public async getAllActiveStockroomsWithOverview(accountId: number): Promise<StockroomSummary[]> {
    const summary: any[] = await this._findAllActiveStockroomsWithSummary(accountId);
     return summary ? StockroomMapper.toStockroomSummary(summary) : [];
  }

  public async getAllDeletedStockrooms(accountId: number): Promise<Stockroom[]> {
    return this._stockroomRepository.find({
      where: { account: { id: accountId }, deletedAt: Not(IsNull()) }
    });
  }

  public async createNewStockroom(accountId: number, createStockroomDto: CreateStockroomDto): Promise<Stockroom> {
    const stockroom: Stockroom = this._stockroomRepository.create({
      name: createStockroomDto.name,
      description: createStockroomDto.description,
      account: { id: accountId }
    });
    return this._stockroomRepository.save(stockroom);
  }

  public async getStockroomById(accountId: number, stockroomId: number): Promise<Stockroom> {
    const stockroom: Stockroom = await this._findStockroomByIdWithAccountId(stockroomId, accountId);
    if (!stockroom) throw new NotFoundException(`Stockroom not found.`);
    return stockroom;
  }

  public async updateStockroom(accountId: number, stockroomId: number, updateStockroomDto: UpdateStockroomDto): Promise<Stockroom> {
    const stockroom: Stockroom = await this._findStockroomByIdWithAccountId(stockroomId, accountId);
    if (!stockroom) throw new NotFoundException(`Unable to find a stockroom to update.`)
    stockroom.name = updateStockroomDto.name;
    stockroom.description = updateStockroomDto.description;
    return this._stockroomRepository.save(stockroom);
  }

  public async deleteStockroom(accountId: number, stockroomId: number): Promise<Stockroom> {
    const stockroom: Stockroom = await this._findStockroomByIdWithAccountId(stockroomId, accountId);
    if (!stockroomId) throw new NotFoundException(`Stockroom not found`);
    stockroom.deletedAt = new Date();
    return this._stockroomRepository.save(stockroom);
  }

  private async _findStockroomByIdWithAccountId(stockroomId: number, accountId: number): Promise<Stockroom> {
    return this._stockroomRepository.findOne({
      id: stockroomId, account: { id: accountId }
    });
  }

  // @@@ TODO Filter out sold items from item count
  private async _findAllActiveStockroomsWithSummary(accountId: number): Promise<any[]> {
    return await this._stockroomRepository.createQueryBuilder('s')
      .select('s.*, COUNT(item) AS item_count, SUM(item.purchase_price) AS purchase_value')
      .innerJoin('s.account', 'account')
      .leftJoin('s.stockItems', 'item')
      .where('s.account_id = :accountId AND s.deleted_at IS NULL', { accountId: accountId })
      .groupBy('s.id, account.id')
      .getRawMany()
  }
}
