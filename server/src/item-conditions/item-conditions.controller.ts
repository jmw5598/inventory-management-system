import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemCondition } from './entities/item-condition.entity';
import { CreateItemConditionDto } from './dtos/create-item-condition.dto';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('item-conditions')
@UseGuards(JwtAuthenticationGuard)
export class ItemConditionsController {
  constructor(
    @InjectRepository(ItemCondition)
    private readonly itemConditionRepository: Repository<ItemCondition>
  ) {}

  @Get()
  public async getItemConditions(): Promise<any> {
    return this.itemConditionRepository.find();
  }

  @Post()
  public async createItemCondition(@Body() createItemConditionDto: CreateItemConditionDto): Promise<any> {
    const itemCondition: ItemCondition = this.itemConditionRepository.create({
      description: createItemConditionDto.description
    });

    return this.itemConditionRepository.save(itemCondition);
  }

  @Get(':id')
  public async getItemConditionById(@Param('id') id: number): Promise<any> {
    const itemCondition: ItemCondition = await this.itemConditionRepository.findOne(id);

    if (!itemCondition) {
      throw new NotFoundException(`Item condition with id ${id} was not found.`);
    }

    return itemCondition;
  }
}
