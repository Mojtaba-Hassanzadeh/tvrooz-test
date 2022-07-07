import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Movie } from 'src/movies/entities/movie.entity';

export type CategoryDocument = Category & Document;

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class Category extends CoreEntity {
  @Field(() => String)
  @Prop({ unique: true })
  @IsString()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  @IsString()
  slug: string;

  @Field(() => [Movie], { nullable: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ])
  movies: mongoose.Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
