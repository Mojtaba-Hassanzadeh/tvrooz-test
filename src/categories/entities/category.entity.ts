import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field(() => String)
  @Prop({ unique: true })
  @IsString()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  @IsString()
  slug: string;

  // @Field(() => [Movie], { nullable: true })
  // @Prop({ type: [{ type: String, ref: 'Movie' }] })
  // restaurants: Movie[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
