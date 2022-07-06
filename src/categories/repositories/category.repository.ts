import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryInput } from '../dtos/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoriesModel: Model<CategoryDocument>,
  ) {}

  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.categoriesModel
      .findOne({ slug: categorySlug })
      .exec();

    if (!category) {
      category = new this.categoriesModel({
        name: categoryName,
        slug: categorySlug,
      });
      await category.save();
    }

    return category;
  }

  async getSlug(name: string): Promise<string> {
    const categoryName = name.trim().toLowerCase();
    return categoryName.replace(/ /g, '-');
  }

  async checkExists(categorySlug: string): Promise<boolean> {
    let category = null;
    category = await this.categoriesModel
      .findOne({ slug: categorySlug })
      .exec();
    return category === null ? false : true;
  }

  async createCategory(input: CreateCategoryInput): Promise<Category> {
    const categoryName = input.name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    const category = new this.categoriesModel({
      name: input.name,
      slug: categorySlug,
    });
    await category.save();
    return category;
  }
}
