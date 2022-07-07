import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { CreateCategoryInput } from './create-category.dto';

@InputType()
export class EditCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class EditCategoryOutput extends CoreOutput {}
