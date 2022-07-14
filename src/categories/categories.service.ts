import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/common/dtos/pagination.dto';
import { CategoriesOutput } from './dtos/categories.dto';
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
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async getAllCategories({
    page,
    limit,
  }: PaginationInput): Promise<CategoriesOutput> {
    try {
      const categories = await this.categoryModel.aggregate([
        { $sort: { _id: 1 } },
        { $setWindowFields: { output: { totalCount: { $count: {} } } } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]);
      if (categories) {
        const totalResults = categories[0].totalCount;
        return {
          ok: true,
          categories: categories as Category[],
          totalPages: Math.ceil(totalResults / limit),
          totalResults,
        };
      }
      return {
        ok: false,
        error: 'Not found any categories',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load categories',
      };
    }
  }

  async getCategoryById(_id: string): Promise<CategoryOutput> {
    try {
      const category = await this.categoryModel.aggregate([
        { $match: { _id } },
      ]);
      if (category) {
        return {
          ok: true,
          // category as Category,
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
      const categories = await this.categoryModel.find({
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
      const category = await this.categoryRepo.checkExists(input.name);
      if (category) {
        return { ok: false, error: 'This category already exists' };
      }
      const newCategory = await this.categoryRepo.createCategory(input);
      return { ok: true, category: newCategory };
    } catch (e) {
      return { ok: false, error: "Can't create category" };
    }
  }

  async updateCategoryById({
    id,
    name,
  }: EditCategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        id,
        {
          name,
          slug: this.categoryRepo.getSlug(name),
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
      const category = await this.categoryModel.findByIdAndDelete(id);
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
