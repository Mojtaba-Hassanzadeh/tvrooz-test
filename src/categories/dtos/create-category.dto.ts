import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { Category } from '../entities/category.entity';

@InputType('CreateCategoryInput')
export class CreateCategoryInput extends PickType(Category, ['name', 'slug']) {}

@ObjectType()
export class CreateCategoryOutput extends CoreOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;
}
// dfdsklfjdslfkjds