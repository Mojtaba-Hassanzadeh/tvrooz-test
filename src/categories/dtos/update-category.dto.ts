import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Category } from '../entities/category.entity';

@InputType('UpdateCategoryInput')
export class UpdateCategoryInput extends PartialType(
  OmitType(Category, ['_id', 'createdAt', 'updatedAt']),
) {
  @Field(() => String)
  @IsString()
  categoryId: string;
}

@ObjectType('UpdateCategoryOutput')
export class UpdateCategoryOutput extends CoreOutput {
  @Field(() => Category, { nullable: true })
  @IsOptional()
  category?: Category;
}
