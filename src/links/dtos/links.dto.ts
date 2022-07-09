import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Link } from '../entities/link.entity';

@ObjectType()
export class LinksOutput extends CoreOutput {
  @Field(() => [Link], { nullable: true })
  links?: Link[];
}
