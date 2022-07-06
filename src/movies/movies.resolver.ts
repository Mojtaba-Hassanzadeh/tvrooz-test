import { Args, Query, Resolver } from '@nestjs/graphql';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movies.service';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => MoviesOutput)
  movies(@Args('input') moviesInput: MoviesInput): Promise<MoviesOutput> {
    return this.movieService.allMovies(moviesInput);
  }
}
