import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';

export type CategoryDocument = Category & Document;

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class Category extends CoreEntity {
  @Field(() => String)
  @Prop({ unique: true, required: true })
  @IsString()
  name: string;

  @Field(() => String)
  @Prop({ unique: true, required: true })
  @IsString()
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
