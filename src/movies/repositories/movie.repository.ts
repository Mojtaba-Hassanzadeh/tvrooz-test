import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/entities/category.entity';
import { Link, LinkDocument } from 'src/links/entities/link.entity';
import { CreateMovieInput } from '../dtos/create-movie.dto';
import { UpdateMovieInput } from '../dtos/update-movie.dto';
import { Movie, MovieDocument } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly moviesRepo: Model<MovieDocument>,
    @InjectModel(Link.name)
    private readonly linksModel: Model<LinkDocument>,
    @InjectModel(Category.name)
    private readonly categoriesModel: Model<CategoryDocument>,
  ) {}

  async createMovie(input: CreateMovieInput): Promise<Movie> {
    let movie: Movie = new Movie();
    try {
      movie.name = input.name;
      movie.secondaryTitle = input.secondaryTitle;
      const newMovie = await this.moviesRepo.create(movie);
      if (input.link) {
        const link = await this.linksModel.findByIdAndUpdate(
          input.link,
          { movie: newMovie._id },
          { new: true },
        );
        if (link) {
          newMovie.link = link._id;
          await newMovie.save();
        }
      }
      if (input.categories.length > 0) {
        input.categories.forEach(async (categoryId) => {
          const category = await this.categoriesModel.findByIdAndUpdate(
            categoryId,
            { $push: { movies: newMovie._id } },
            { new: true },
          );
          if (category) {
            await newMovie.updateOne(
              { $push: { categories: category._id } },
              { new: true },
            );
          }
        });
      }
      return movie;
    } catch (error) {
      return null;
    }
  }

  async updateMovie(input: UpdateMovieInput): Promise<Movie> {
    try {
      // const movie = await this.moviesRepo.findByIdAndUpdate(
      //   input._id,
      //   {
      //     name: input.name,
      //     secondaryTitle: input.secondaryTitle,
      //   },
      //   {
      //     new: true,
      //   },
      // );
      const movie = null;
      if (movie) {
        if (input.name) {
          movie.name = input.name;
        }
      }
      if (input.link && movie.link.toString() !== input.link) {
        await this.linksModel.findByIdAndUpdate(
          movie.link,
          { movie: null },
          { new: true },
        );
        const newLink = await this.linksModel.findByIdAndUpdate(
          input.link,
          { movie: movie._id },
          { new: true },
        );
        if (newLink) {
          movie.link = newLink._id;
          await movie.save();
        }
      }
      if (input.categories.length > 0) {
        movie.categories.forEach(async (oldCategoryId) => {
          await this.categoriesModel.findByIdAndUpdate(
            oldCategoryId,
            { $pop: { movies: movie._id } },
            { new: true },
          );
        });
        input.categories.forEach(async (newCategoryId) => {
          const category = await this.categoriesModel.findByIdAndUpdate(
            newCategoryId,
            { $push: { movies: movie._id } },
            { new: true },
          );
          if (category) {
            await movie.updateOne(
              { $push: { categories: category._id } },
              { new: true },
            );
          }
        });
      }
      return movie;
    } catch (error) {
      return null;
    }
  }
}
