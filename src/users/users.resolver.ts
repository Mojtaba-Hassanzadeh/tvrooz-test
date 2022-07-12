
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      return this.usersService.createUser(input);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  // @Mutation((returns) => LoginOutput)
  // async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
  //   try {
  //     return this.usersService.login(loginInput);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // @Query((returns) => User)
  // @Role(['Any'])
  // me(@AuthUser() authUser: User) {
  //   return authUser;
  // }

  // @Query((returns) => UserProfileOutput)
  // @Role(['Any'])
  // async userProfile(
  //   @Args() userProfileInput: UserProfileInput,
  // ): Promise<UserProfileOutput> {
  //   try {
  //     const user = await this.usersService.findById(userProfileInput.userId);
  //     if (!user) {
  //       throw Error();
  //     }
  //     return {
  //       ok: true,
  //       user,
  //     };
  //   } catch (error) {
  //     return {
  //       error: 'User not found',
  //       ok: false,
  //     };
  //   }
  // }

  // @Role(['Any'])
  // @Mutation((returns) => EditProfileOutput)
  // async editProfile(
  //   @AuthUser() authUser: User,
  //   @Args('input') editProfileInput: EditProfileInput,
  // ): Promise<EditProfileOutput> {
  //   try {
  //     console.log(editProfileInput);
  //     await this.usersService.editProfile(authUser._id, editProfileInput);
  //     return {
  //       ok: true,
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error,
  //     };
  //   }
  // }

  // @Mutation((returns) => VerifyEmailOutput)
  // async verifyEmail(
  //   @Args('input') { code }: VerifyEmailInput,
  // ): Promise<VerifyEmailOutput> {
  //   try {
  //     await this.usersService.verifyEmail(code);
  //     return {
  //       ok: true,
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error,
  //     };
  //   }
  // }
}