import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { DeleteMovieOutput } from './dtos/delete-movie.dto';
import { MovieOutput } from './dtos/movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import {
  SearchMovieCategoryNameInput,
  SearchMovieCategoryOutput,
} from './dtos/search-movie-category.dto';
import {
  SearchMovieNameInput,
  SearchMovieSecondaryTitleInput,
} from './dtos/search-movie-name.dto';
import { UpdateMovieInput, UpdateMovieOutput } from './dtos/update-movie.dto';
import { Movie, MovieDocument } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private readonly moviesModel: Model<MovieDocument>,
    private readonly moviesRepo: MovieRepository,
  ) {}

  async allMovies({ page, limit }: MoviesInput): Promise<MoviesOutput> {
    try {
      const movies: Movie[] = (await this.moviesModel.find(null, null, {
        limit: limit,
        skip: (page - 1) * limit,
      })) as Movie[];
      const totalResults = await this.moviesModel.countDocuments();
      return {
        ok: true,
        movies,
        totalPages: Math.ceil(totalResults / limit),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load movies',
      };
    }
  }

  async getMovieById(id: string): Promise<MovieOutput> {
    try {
      const movie = await this.moviesModel.findById(id);
      if (movie) {
        return {
          ok: true,
          movie,
        };
      }
      return { ok: false, error: 'Movie not found' };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load movie',
      };
    }
  }

  async getMovieByName(input: SearchMovieNameInput): Promise<MoviesOutput> {
    try {
      const movies: Movie[] = (await this.moviesModel.find(
        {
          name: {
            $regex: input.name,
            $options: 'i',
          },
        },
        null,
        {
          limit: input.limit,
          skip: (input.page - 1) * input.limit,
        },
      )) as Movie[];
      const totalResults = await this.moviesModel.countDocuments();
      if (movies) {
        return {
          ok: true,
          movies,
          totalPages: Math.ceil(totalResults / input.limit),
          totalResults,
        };
      }
      return { ok: false, error: 'Movies not found' };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load movies',
      };
    }
  }

  async getMovieByScondaryTitle({
    page,
    limit,
    title,
    linkId,
  }: SearchMovieSecondaryTitleInput): Promise<MoviesOutput> {
    const sort: any = title
      ? { score: { $meta: 'textScore' }, _id: 1 }
      : { _id: 1 };
    const $or = [
      { $text: { $search: title } },
      { secondaryTitle: { $regex: title } },
    ];

    try {
      const [moviesData] = await this.moviesModel.aggregate([
        {
          $match: {
            ...(title ? { $or } : {}),
            ...(linkId && { linkId: { $gte: 1 } }),
          },
        },
        // { $sort: { score: { $meta: 'textScore' }, _id: 1 } },
        // { $setWindowFields: { output: { totalCount: { $count: {} } } } },
        // { $skip: (page - 1) * limit },
        // { $limit: limit },
        // {
        {
          $facet: {
            movies: [
              { $sort: sort },
              { $skip: (page - 1) * limit },
              { $limit: limit },
              { $project: { name: 1, secondaryTitle: 1, _id: 0 } },
            ],
            totalResults: [{ $count: 'count' }],
          },
        },
      ]);
      const { movies = [], totalResults } = moviesData;
      const totalResult = totalResults?.[0].count;

      if (movies) {
        return {
          ok: true,
          movies: movies,
          totalPages: Math.ceil(totalResult / limit),
          totalResults: totalResult,
        };
      }
      return { ok: false, error: 'Movies not found' };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not load movies',
      };
    }
  }

  async getMovieByCategoryName({
    page,
    limit,
    categoryName,
  }: SearchMovieCategoryNameInput): Promise<SearchMovieCategoryOutput> {
    try {
      const movies: Movie[] = (await this.moviesModel.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        { $match: { 'categories.name': categoryName } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ])) as Movie[];

      console.log(movies); //[0].categories);
      // const totalResults = movies.length;
      if (movies) {
        return {
          ok: true,
          movies,
          // totalPages: Math.ceil(totalResults / limit),
          // totalResults,
        };
      }
      return { ok: false, error: 'Movies not found' };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load movies',
      };
    }
  }

  async createMovie(input: CreateMovieInput): Promise<CreateMovieOutput> {
    try {
      // const link = await this.linksModel.findByIdAndUpdate(
      //   input.link,
      //   { movie: newMovie._id },
      //   { new: true },
      // );
      // check link
      // check category
      // check movie
      const movie = await this.moviesRepo.createMovie(input);
      return { ok: true, movie };
    } catch (e) {
      return { ok: false, error: "Can't create movie" };
    }
  }

  async updateMovie(input: UpdateMovieInput): Promise<UpdateMovieOutput> {
    try {
      const movie = await this.moviesRepo.updateMovie(input);
      return { ok: true, movie };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not update movie',
      };
    }
  }

  async deleteMovie(id: string): Promise<DeleteMovieOutput> {
    try {
      const movie = await this.moviesRepo.deleteMovie(id);
      if (movie) {
        return { ok: true };
      }
      return { ok: false, error: 'Movie not found' };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete movie',
      };
    }
  }
}
