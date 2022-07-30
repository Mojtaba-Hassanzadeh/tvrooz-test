import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryInput } from '../dtos/create-category.dto';
import { UpdateCategoryInput } from '../dtos/update-category.dto';
import { DeleteCategoryInput } from '../dtos/delete-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(input: CreateCategoryInput): Promise<Category> {
    const category = new this.categoryModel(input);
    await category.save();
    return category;
  }

  async update({
    categoryId,
    ...restOfArgs
  }: UpdateCategoryInput): Promise<Category | null> {
    const category = await this.categoryModel.findByIdAndUpdate(
      { _id: categoryId },
      restOfArgs,
      { new: true },
    );
    if (category) {
      return category;
    }
    return null;
  }

  async delete({ categoryId }: DeleteCategoryInput): Promise<Category | null> {
    const category = await this.categoryModel.findByIdAndDelete({
      _id: categoryId,
    });
    if (category) {
      return category;
    }
    return null;
  }
  // add comment
}
