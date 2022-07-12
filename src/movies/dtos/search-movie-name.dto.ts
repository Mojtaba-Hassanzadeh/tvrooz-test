import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from 'src/common/dtos/pagination.dto';

@InputType()
export class SearchMovieNameInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class SearchMovieSecondaryTitleInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  title?: string;
}
