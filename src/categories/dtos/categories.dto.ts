import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class CategoriesOutput extends PaginationOutput {
  @Field(() => [Category], { nullable: true })
  @IsOptional()
  categories?: Category[];
}
