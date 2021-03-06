import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Movie } from '../entities/movie.entity';

@InputType()
export class CreateMovieInput extends PickType(Movie, [
  'name',
  'secondaryTitle',
]) {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];
}

@ObjectType()
export class CreateMovieOutput extends CoreOutput {
  @Field(() => Movie, { nullable: true })
  movie?: Movie;
}
