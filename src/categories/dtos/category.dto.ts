import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { PaginationInput } from 'src/common/dtos/pagination.dto';
import { Category } from '../entities/category.entity';

@InputType()
export class CategoryInput extends PaginationInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class CategoryOutput extends CoreOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;
}
