import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCondition } from '../database/entities/item-condition.entity';
import { CreateItemConditionDto } from './dto/create-item-condition.dto';

@Controller('item-conditions')
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
