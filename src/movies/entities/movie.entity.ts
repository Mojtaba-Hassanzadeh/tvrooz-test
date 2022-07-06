import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Link } from 'src/links/entities/link.entity';

export type MovieDocument = Movie & Document;

@InputType('MovieInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class Movie {
  @Field(() => String)
  @Prop()
  @IsString()
  name: string;

  @Field(() => String)
  @Prop()
  @IsString()
  secondaryTitle: string;

  @Field(() => [Category], { nullable: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  ])
  categories: mongoose.Types.ObjectId[];

  @Field(() => Link)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
  })
  link: Link;
}

export const MoviewSchema = SchemaFactory.createForClass(Movie);
