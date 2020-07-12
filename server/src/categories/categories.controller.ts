import { Controller, Get, Post, Body, NotFoundException, Param, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  @Get()
  public async getCategories(): Promise<any> {
    return this.categoryRepository.find();
  }

  @Post()
  public async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    const category: Category = this.categoryRepository.create({
      description: createCategoryDto.description
    });

    return this.categoryRepository.save(category);
  }

  @Get(':id')
  public async getCategoryById(@Param('id') id: number): Promise<any> {
    const category: Category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
