import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Movie } from '../entities/movie.entity';

@InputType()
export class SearchMovieCategoryNameInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  categoryName?: string;
}

@InputType()
export class SearchMovieCategorySlugInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  categorySlug?: string;
}

@ObjectType()
export class SearchMovieCategoryOutput extends PaginationOutput {
  @Field(() => [Movie], { nullable: true })
  movies?: Movie[];
}
