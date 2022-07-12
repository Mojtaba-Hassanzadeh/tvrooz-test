import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { DeleteMovieOutput } from './dtos/delete-movie.dto';
import { MovieOutput } from './dtos/movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import {
  SearchMovieCategoryInput,
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
  }: SearchMovieSecondaryTitleInput): Promise<MoviesOutput> {
    try {
      const movies: Movie[] = (await this.moviesModel.find(
        {
          secondaryTitle: {
            $regex: title,
            $options: 'i',
          },
        },
        null,
        {
          limit: limit,
          skip: (page - 1) * limit,
        },
      )) as Movie[];
      const totalResults = await this.moviesModel.countDocuments();
      if (movies) {
        return {
          ok: true,
          movies,
          totalPages: Math.ceil(totalResults / limit),
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

  async getMovieByCategory({
    page,
    limit,
    category,
  }: SearchMovieCategoryInput): Promise<SearchMovieCategoryOutput> {
    try {
      const allMovies = await this.moviesModel
        .find({ 'categories.0': { $exists: true } }, null, {
          // return movies with at least one category
          limit: limit,
          skip: (page - 1) * limit,
        })
        .populate('categories', 'name')
        .exec(function (err, movies) {
          if (err) return err;
          movies.forEach(function (movie) {
            console.log(movies.length);
            console.log(movie.categories);
          });
        });
      const totalResults = await this.moviesModel.countDocuments();
      if (true) {
        return {
          ok: true,
          // movies,
          totalPages: Math.ceil(totalResults / limit),
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

  async createMovie(input: CreateMovieInput): Promise<CreateMovieOutput> {
    try {
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
