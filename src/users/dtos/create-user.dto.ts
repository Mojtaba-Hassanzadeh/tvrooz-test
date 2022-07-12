import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/otuput.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'pass',
  'displayName',
  'username',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}