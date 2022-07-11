import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Movie } from '../entities/movie.entity';
import { CreateMovieInput } from './create-movie.dto';

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {}

@ObjectType()
export class UpdateMovieOutput extends CoreOutput {
  @Field(() => Movie, { nullable: true })
  movie?: Movie;
}
