import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';


export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

// for graphql
registerEnumType(UserRole, { name: 'Role' });

export type UserDocument = User & Document;
@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Schema({ timestamps: true })
export class User extends CoreEntity {
  @Field(() => String)
  @Prop()
  @IsString()
  username: string;

  @Field(() => String)
  @Prop()
  @IsString()
  displayName: string;

  @Field(() => String)
  @Prop()
  @IsEmail()
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  @Field(() => String)
  @IsString()
  pass: string;

  @Prop()
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

}

export const UserSchema = SchemaFactory.createForClass(User);
