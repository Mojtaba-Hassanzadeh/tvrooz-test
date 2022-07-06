import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, Length } from 'class-validator';
import { Document } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';

export type MovieDocument = Movie & Document;

@InputType('MovieInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class Movie extends CoreEntity {
  @Field(() => String)
  @Prop()
  @IsString()
  name: string;

  @Field(() => String)
  @Prop()
  @IsString()
  secondaryTitle: string;

  //   @Field(() => [Category], { nullable: true })
  //   @Prop([{
  //     type: String,
  //     ref: 'Category',
  //     required: false,
  //   }])
  //   categories: Category[];

  //   @Field(() => Link)
  //   @Prop({
  //     type: String,
  //     ref: 'Link',
  //   })
  //   link: Link;
}

export const MoviewSchema = SchemaFactory.createForClass(Movie);
