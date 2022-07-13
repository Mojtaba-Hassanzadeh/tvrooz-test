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
import { UpdateLinkOutput } from 'src/links/dtos/edit-link.dto';
import { UpdateMovieInput } from './dtos/update-movie.dto';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import { DeleteMovieOutput } from './dtos/delete-movie.dto';
import { MovieOutput } from './dtos/movie.dto';
import {
  SearchMovieNameInput,
  SearchMovieSecondaryTitleInput,
} from './dtos/search-movie-name.dto';
import {
  SearchMovieCategoryNameInput,
  SearchMovieCategoryOutput,
} from './dtos/search-movie-category.dto';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService,
    private readonly linkRepo: LinkRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  @Query(() => MovieOutput)
  async movieById(@Args('id') id: string): Promise<MovieOutput> {
    return await this.movieService.getMovieById(id);
  }

  @Query(() => MoviesOutput)
  async moviesByName(
    @Args('input') input: SearchMovieNameInput,
  ): Promise<MoviesOutput> {
    return await this.movieService.getMovieByName(input);
  }

  @Query(() => MoviesOutput)
  async moviesBySecondaryTitle(
    @Args('input') input: SearchMovieSecondaryTitleInput,
  ): Promise<MoviesOutput> {
    return await this.movieService.getMovieByScondaryTitle(input);
  }

  @Query(() => SearchMovieCategoryOutput)
  async moviesByCategory(
    @Args('input') input: SearchMovieCategoryNameInput,
  ): Promise<SearchMovieCategoryOutput> {
    return await this.movieService.getMovieByCategoryName(input);
  }

  @Query(() => MoviesOutput)
  movies(@Args('input') moviesInput: MoviesInput): Promise<MoviesOutput> {
    return this.movieService.allMovies(moviesInput);
  }

  @ResolveField(() => Link, { nullable: true })
  async link(@Parent() movie: Movie): Promise<Link> {
    return await this.linkRepo.getLinkByMovieId(movie._id);
  }

  //TODO: null
  @ResolveField(() => Category, { nullable: true })
  async category(@Parent() movie: Movie): Promise<Category> {
    return await this.categoryRepo.getCategoriesByMovieId(movie);
  }

  @Mutation(() => CreateMovieOutput)
  createMovie(
    @Args('input') input: CreateMovieInput,
  ): Promise<CreateMovieOutput> {
    return this.movieService.createMovie(input);
  }

  @Mutation(() => UpdateLinkOutput)
  updateMovie(
    @Args('input') input: UpdateMovieInput,
  ): Promise<UpdateLinkOutput> {
    return this.movieService.updateMovie(input);
  }

  @Mutation(() => DeleteMovieOutput)
  deleteMovie(@Args('id') id: string): Promise<DeleteMovieOutput> {
    return this.movieService.deleteMovie(id);
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
