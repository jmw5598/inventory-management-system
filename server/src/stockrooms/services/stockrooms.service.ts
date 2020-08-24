import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';

import { Location } from '../entities/location.entity';
import { Stockroom } from '../entities/stockroom.entity';
import { StockroomSummary } from '../dtos/stockroom-summary.dto';
import { StockroomMapper } from '../mappers/stockroom.mapper';
import { StockroomNotFoundException } from '../exceptions/stockroom-not-found.exception';
import { CreateStockroomDto } from '../dtos/create-stockroom.dto';
import { UpdateStockroomDto } from '../dtos/update-stockroom.dto';
import { UpdateLocationDto } from '../dtos/update-location.dto';
import { CreateLocationDto } from '../dtos/create-location.dto';

@Injectable()
export class StockroomsService {
  constructor(
    @InjectRepository(Stockroom)
    private readonly _stockroomRepository: Repository<Stockroom>,
    @InjectRepository(Location)
    private readonly _locationRepository: Repository<Location>,
  ) {}

  public async getAllStockrooms(accountId: number): Promise<Stockroom[]> {
    return this._stockroomRepository.find({
      relations: ['locations'],
      where: { account: { id: accountId }, deletedAt: IsNull() },
      order: { name: "ASC" }
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
    const stockroom: Stockroom = await this._createNewStockroom(accountId, createStockroomDto);
    const locations: Location[] = await this._createNewStockroomLocations(stockroom.id, createStockroomDto.locations);
    stockroom.locations = locations;
    return stockroom;
  }

  public async getStockroomById(accountId: number, stockroomId: number): Promise<Stockroom> {
    const stockroom: Stockroom = await this._findStockroomByIdWithAccountId(stockroomId, accountId);
    if (!stockroom) throw new StockroomNotFoundException();
    return stockroom;
  }

  public async updateStockroom(accountId: number, stockroomId: number, updateStockroomDto: UpdateStockroomDto): Promise<Stockroom> {
    const updatedStockroom: Stockroom = await this._updateStockroom(accountId, stockroomId, updateStockroomDto); 
    const deletedLocationsResult = await this._removeLocationsNotInLocationsDto(updatedStockroom.locations, updateStockroomDto.locations);
    const updatedLocation: Location[] = await this._insertOrUpdateStockroomLocations(updatedStockroom.id, updateStockroomDto.locations); 
    return this._findStockroomByIdWithAccountId(stockroomId, accountId);
  }

  public async deleteStockroom(accountId: number, stockroomId: number): Promise<Stockroom> {
    const softDeletedStockroom: Stockroom = await this._softDeleteStockroom(accountId, stockroomId);
    const softDeletedLocations: Location[] = await this._softDeleteStockroomLocations(stockroomId);
    softDeletedStockroom.locations = softDeletedLocations;
    return softDeletedStockroom;
  }

  private async _softDeleteStockroom(accountId: number, stockroomId: number): Promise<Stockroom> {
    const stockroom: Stockroom = await this._findStockroomByIdWithAccountId(stockroomId, accountId);
    if (!stockroomId) {
      throw new StockroomNotFoundException(); 
    }
    stockroom.deletedAt = new Date();
    return this._stockroomRepository.save(stockroom);
  }

  private async _softDeleteStockroomLocations(stockroomId: number): Promise<Location[]> {
    const locations: Location[] = await this._locationRepository.find({ where: { stockroom: { id: stockroomId }}})
    locations.forEach(e => e.deletedAt = new Date());
    return this._locationRepository.save(locations);
  }

  private async _createNewStockroom(accountId: number, createStockroomDto: CreateStockroomDto): Promise<Stockroom> {
    let stockroom: Stockroom = this._stockroomRepository.create({
      name: createStockroomDto.name,
      description: createStockroomDto.description,
      account: { id: accountId },
    });
    return this._stockroomRepository.save(stockroom);
  }

  private async _createNewStockroomLocations(stockroomId: number, createLocationDto: CreateLocationDto[]): Promise<Location[]> {
    let locations: Location[] = [];
    if (createLocationDto && createLocationDto.length > 0) {
      locations = createLocationDto.map(location => {
        return this._locationRepository.create({
          description: location.description,
          stockroom: { id: stockroomId }
        })
      })
    }
    return this._locationRepository.save(locations);
  }

  private async _updateStockroom(accountId: number, stockroomId: number, updateStockroomDto: UpdateStockroomDto): Promise<Stockroom> {
    const stockroom: Stockroom = await this._findStockroomByIdWithAccountId(stockroomId, accountId);
    if (!stockroom) throw new StockroomNotFoundException(); 
    stockroom.name = updateStockroomDto.name;
    stockroom.description = updateStockroomDto.description;
    return this._stockroomRepository.save(stockroom);
  }

  private async _removeLocationsNotInLocationsDto(locations:  Location[], updateLocationDtos: UpdateLocationDto[]): Promise<any> {
    updateLocationDtos = updateLocationDtos ? updateLocationDtos : [];
    const locationsToDelete = locations.filter(e => {
      return updateLocationDtos.findIndex(l => l.id === e.id) === -1
    }).map(e => e.id) || [];
    if (locationsToDelete.length > 0) {
      return this._locationRepository.delete(locationsToDelete);
    }
    return Promise.resolve([]);
  }

  private async _insertOrUpdateStockroomLocations(stockroomId: number, updateLocationsDto: UpdateLocationDto[]): Promise<Location[]> {
    updateLocationsDto = updateLocationsDto ? updateLocationsDto : [];
    const locationsToSave = updateLocationsDto.map(e => {
      return this._locationRepository.create({
        id: (e.id || null),
        description: e.description,
        stockroom: { id: stockroomId }
      }) 
    });
    return this._locationRepository.save(locationsToSave);
  }

  private async _findStockroomByIdWithAccountId(stockroomId: number, accountId: number): Promise<Stockroom> {
    return this._stockroomRepository.findOne({
      id: stockroomId, account: { id: accountId }
    }, { relations: ['locations'] });
  }

  // @@@ TODO Filter out sold items from item count
  private async _findAllActiveStockroomsWithSummary(accountId: number): Promise<any[]> {
    return await this._stockroomRepository.createQueryBuilder('s')
      .select('s.*, COUNT(item) AS item_count, SUM(item.purchase_price) AS purchase_value')
      .innerJoin('s.account', 'account')
      .leftJoin('s.stockItems', 'item')
      .where('s.account_id = :accountId AND s.deleted_at IS NULL', { accountId: accountId })
      .groupBy('s.id, account.id')
      .orderBy('s.name', 'ASC')
      .getRawMany()
  }
}
