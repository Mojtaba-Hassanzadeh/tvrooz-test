import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import { Movie, MovieDocument } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private readonly moviesModel: Model<MovieDocument>,
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
        results: movies,
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
      // const isExists = await this.linkRepository.checkExists(input.url);
      // if (isExists) {
      //   return { ok: false, error: 'This link already exists' };
      // }
      const movie = new this.moviesModel({
        name: input.name,
        secondaryTitle: input.secondaryTitle,
        categories: input.categories, 
        link: input.link,
      });
      await movie.save();
      return { ok: true, movie };
    } catch (e) {
      return { ok: false, error: "Can't create movie" };
    }
  }

}
