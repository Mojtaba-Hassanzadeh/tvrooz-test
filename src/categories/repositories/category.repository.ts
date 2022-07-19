import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryInput, CreateCategoryOutput } from '../dtos/create-category.dto';
import { ObjectId } from 'mongodb';
import { Movie } from 'src/movies/entities/movie.entity';
import { PaginationInput } from 'src/common/dtos/pagination.dto';
import { CategoriesOutput } from '../dtos/categories.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.categoryModel
      .findOne({ slug: categorySlug })
      .exec();

    if (!category) {
      category = new this.categoryModel({
        name: categoryName,
        slug: categorySlug,
      });
      await category.save();
    }

    return category;
  }

  getSlug(name: string): string {
    const categoryName = name.trim().toLowerCase();
    return categoryName.replace(/ /g, '-');
  }

  async checkExists(categoryName: string): Promise<Category> {
    const categorySlug = this.getSlug(categoryName);
    const [category] = await this.categoryModel.aggregate([
      { $match: { slug: categorySlug } },
    ]);
    return category;
  }

  async createCategory({ name }: CreateCategoryInput): Promise<Category> {
    const slug = this.getSlug(name);
    const category = new this.categoryModel({
      name,
      slug,
    });
    await category.save();
    return category;
  }

  // async getCategoriesByMovieId(id: ObjectId): Promise<Category> {
  //   try {
  //     console.log(id);
  //     console.log(await this.categoriesModel.find({ movie: [id] }).exec());
  //     return await this.categoriesModel.findOne({ movie: id });
  //   } catch (error) {
  //     return null;
  //   }
  // }

  async getCategoriesByMovieId(movie: Movie): Promise<Category> {
    try {
      if (movie.categories.length > 0) {
        movie.categories.forEach(async (category) => {
          const cat = await this.categoryModel.findById(category);
          if (cat) {
            console.log(cat);
            return cat;
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  // async create({name}: CreateCategoryInput): Promise<Category> {
  //   const category = new this.categoryModel({
  //     name,
  //   });
  //   await category.save();
  //   return category;
  // }
}
