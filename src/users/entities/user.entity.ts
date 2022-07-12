import { InputType, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';

export type UserDocument = User & Document;

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class User extends CoreEntity {
  //   displayName, username ,pass , email, role
  @Field(() => String)
  @Prop()
  @IsString()
  username: string;

  @Field(() => String)
  @Prop()
  @IsString()
  email: string;

  @Field(() => [Category], { nullable: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  ])
  categories: mongoose.Types.ObjectId[];

  // @Field(() => Link, { nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: false,
  })
  link: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
