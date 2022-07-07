import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { DeleteCategoryOutput } from './dtos/delete-category.dto';
import {
  EditCategoryInput,
  EditCategoryOutput,
} from './dtos/edit-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoriesModel: Model<CategoryDocument>,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async allCategories(): Promise<CategoriesOutput> {
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

  async findCategoryByName(input: CategoryInput): Promise<CategoriesOutput> {
    try {
      const categories = await this.categoriesModel.find({
        name: {
          $regex: input.name,
          $options: 'i',
        },
        limit: 25,
        skip: (input.page - 1) * 25,
      });
      if (categories) {
        return {
          ok: true,
          categories,
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
      const isExists = await this.categoryRepository.checkExists(input.name);
      if (isExists) {
        return { ok: false, error: 'This category already exists' };
      }
      const category = await this.categoryRepository.createCategory(input);
      return { ok: true, category };
    } catch (e) {
      return { ok: false, error: "Can't create category" };
    }
  }

  async updateCategoryById({
    id,
    name,
  }: EditCategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categoriesModel.findByIdAndUpdate(
        id,
        {
          name,
          slug: this.categoryRepository.getSlug(name),
        },
        { new: true },
      );
      return {
        ok: true,
        category,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not edit category',
      };
    }
  }

  async deleteCategoryById(id: string): Promise<DeleteCategoryOutput> {
    try {
      const category = await this.categoriesModel.findByIdAndDelete(id);
      if (category) {
        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: 'Category not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete category',
      };
    }
  }
}
