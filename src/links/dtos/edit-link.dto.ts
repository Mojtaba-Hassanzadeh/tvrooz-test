import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Link } from '../entities/link.entity';
import { LinkOutput } from './link.dto';

@InputType()
export class UpdateLinkInput extends PickType(Link, ['_id', 'url']) {}

@ObjectType()
export class UpdateLinkOutput extends LinkOutput {
  @Field(() => Link, { nullable: true })
  link?: Link;
}
