import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
