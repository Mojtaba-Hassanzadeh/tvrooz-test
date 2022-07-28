import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Category } from '../entities/category.entity';

@InputType('CreateCategoryInput')
export class CreateCategoryInput extends PickType(Category, ['name', 'slug']) {}

@ObjectType()
export class CreateCategoryOutput extends CoreOutput {
  @Field(() => Category, { nullable: true })
  @IsOptional()
  category?: Category;
}
