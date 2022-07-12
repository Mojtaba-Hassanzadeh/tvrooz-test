import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Movie } from '../entities/movie.entity';

@ObjectType()
export class MovieOutput extends CoreOutput {
  @Field(() => Movie, { nullable: true })
  movie?: Movie;
}
