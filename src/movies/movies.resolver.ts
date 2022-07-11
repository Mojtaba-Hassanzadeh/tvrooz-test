import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Link } from 'src/links/entities/link.entity';
import { LinkRepository } from 'src/links/repositories/link.repository';
import { LinkService } from 'src/links/links.service';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movies.service';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService,
    private readonly linkRepo: LinkRepository,
  ) {}

  @Query(() => MoviesOutput)
  movies(@Args('input') moviesInput: MoviesInput): Promise<MoviesOutput> {
    return this.movieService.allMovies(moviesInput);
  }

  @Mutation(() => CreateMovieOutput)
  createMovie(
    @Args('input') input: CreateMovieInput,
  ): Promise<CreateMovieOutput> {
    return this.movieService.createMovie(input);
  }

  @ResolveField(() => Link)
  async link(@Parent() movie: Movie) {
    return this.linkRepo.getLinkByMovieId(movie._id.toString());
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
