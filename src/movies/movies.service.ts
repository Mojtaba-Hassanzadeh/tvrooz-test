import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
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

  async allMovies({ page }: MoviesInput): Promise<MoviesOutput> {
    try {
      const movies = await this.moviesModel.find({
        skip: (page - 1) * 3,
        take: 3,
      });
      const totalResults = await this.moviesModel.countDocuments();
      return {
        ok: true,
        movies,
        totalPages: Math.ceil(totalResults / 3),
        totalResults,
      };
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
}
