import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { CoreOutput } from 'src/common/dtos/otuput.dto';

@InputType('DeleteCategoryInput')
export class DeleteCategoryInput {
    @Field(() => String)
    @Prop({ unique: true, required: true, type: String })
    id: string;
}

@ObjectType('DeleteCategoryOutput')
export class DeleteCategoryOutput extends CoreOutput {}
