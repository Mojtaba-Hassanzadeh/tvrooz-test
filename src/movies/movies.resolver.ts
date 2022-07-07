import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Link } from 'src/links/entities/link.entity';
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

  // @ResolveField(() => Link)
  // link(@Parent() movie: Movie): any {
  //   return {
  //     url: 'https://www.google.com',
  //   };
  // }

  // @ResolveField()
  // am(): string {
  //   return 'am';
  // }
}
