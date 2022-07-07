import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

@ObjectType()
export class CoreEntity {
  @Field(() => String)
  _id: ObjectId;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
