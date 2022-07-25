import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/otuput.dto';

@InputType('DeleteCategoryInput')
export class DeleteCategoryInput {
  @Field(() => String)
  @IsString()
  categoryId: string;
}

@ObjectType('DeleteCategoryOutput')
export class DeleteCategoryOutput extends CoreOutput {}
