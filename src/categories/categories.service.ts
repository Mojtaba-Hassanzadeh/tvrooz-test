import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryOutput } from './dtos/category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoriesModel: Model<CategoryDocument>,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categoriesModel.find();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load categories',
      };
    }
  }

  async findCategoryById(id: string): Promise<CategoryOutput> {
    try {
      const category: Category = await this.categoriesModel.findById(id);
      if (category) {
        return {
          ok: true,
          category,
        };
      }
      return {
        ok: false,
        error: 'Category not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load categories',
      };
    }
  }

  async findCategoryByName(name: string): Promise<CategoryOutput> {
    try {
      const [category] = await this.categoriesModel.find(
        {
          name: {
            $regex: name,
            $options: 'i',
          },
        },
        // {
        //   limit: 25,
        //   skip: (page - 1) * 25,
        // },
      );
      if (category) {
        return {
          ok: true,
          category,
        };
      }
      return {
        ok: false,
        error: 'Category not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load categories',
      };
    }
  }

  async createCategory(
    input: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
      const slug = await this.categoryRepository.getSlug(input.name);
      const isExists = await this.categoryRepository.checkExists(slug);
      if (isExists) {
        return { ok: false, error: 'This category already exists' };
      }
      const category = await this.categoryRepository.createCategory(input);
      return { ok: true, category };
    } catch (e) {
      return { ok: false, error: "Can't create category" };
    }
  }
}
