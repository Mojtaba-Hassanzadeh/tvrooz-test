import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async createUser({
    username,
    displayName,
    email,
    pass,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exists = await this.usersModel.findOne({ email });
      if (exists) {
        return { ok: false, error: 'Email already exists' };
      }
      // (await this.usersModel.create({ email, password, role })).save();
      const user = await this.usersModel.create({ username,
        displayName,
        email,
        pass,
        role,})
      // const verification = await this.verificationsModel.create({
      //   user,
      // });
      // verification.save();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Can't create account" };
    }
  }

  // async login({
  //   email,
  //   password,
  // }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
  //   try {
  //     const user = await this.usersModel.findOne(
  //       { email },
  //       {
  //         _id: 1,
  //         password: 1,
  //       },
  //     );
  //     if (!user) {
  //       return { ok: false, error: 'User not found' };
  //     }
  //     const passwordCorrect = await user.checkPassword(password);
  //     if (!passwordCorrect) {
  //       return { ok: false, error: 'Wrong password' };
  //     }
  //     const token = this.jwtService.sign(user.id);
  //     return { ok: true, token };
  //   } catch (error) {
  //     return { ok: false, error };
  //   }
  // }

  async findById(id: string): Promise<UserDocument> {
    return this.usersModel.findById(id);
  }

  // async editProfile(
  //   userId: string,
  //   { email, password }: EditProfileInput,
  // ): Promise<User> {
  //   const user = await this.usersModel.findById(userId);
  //   if (email) {
  //     user.email = email;
  //     user.verified = false;
  //     const verification = await this.verificationsModel.create({ user });
  //     verification.save();
  //     this.mailService.sendVerificationEmail(user.email, verification.code);
  //   }
  //   if (password) {
  //     user.pass = await bcrypt.hash(password, 10);
  //   }
  //   await user.save();
  //   return user;
  // }

  // async verifyEmail(code: string): Promise<VerifyEmailOutput> {
  //   try {
  //     const verification = await this.verificationsModel
  //       .findOne({ code })
  //       .populate('user');

  //     if (verification) {
  //       const user = verification.user as unknown as UserDocument;
  //       user.verified = true;
  //       console.log(verification.user);
  //       await user.save();
  //       await this.verificationsModel.deleteOne(verification.id);
  //       return {
  //         ok: true,
  //       };
  //     }
  //     return {
  //       ok: false,
  //       error: 'Verification not found.',
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error,
  //     };
  //   }
  // }
}