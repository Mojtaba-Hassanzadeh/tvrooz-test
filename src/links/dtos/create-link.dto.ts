import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Link } from '../entities/link.entity';

@InputType()
export class CreateLinkInput extends PickType(Link, ['url', 'movie']) {}

@ObjectType()
export class CreateLinkOutput extends CoreOutput {
  @Field(() => Link, { nullable: true })
  link?: Link;
}
