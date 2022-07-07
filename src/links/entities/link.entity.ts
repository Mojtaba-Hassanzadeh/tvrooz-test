import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Movie } from 'src/movies/entities/movie.entity';

export type LinkDocument = Link & Document;

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class Link extends CoreEntity {
  @Field(() => String)
  @Prop()
  @IsString()
  url: string;

  @Field(() => Movie)
  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  })
  movie: mongoose.Types.ObjectId;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
