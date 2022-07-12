import { ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';

@ObjectType()
export class DeleteMovieOutput extends CoreOutput {}
