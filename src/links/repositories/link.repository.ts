import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkInput } from '../dtos/create-link.dto';
import { Link } from '../entities/link.entity';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectModel(Link.name)
    private readonly linksModel: Model<Link>,
  ) {}

  async checkExists(url: string): Promise<boolean> {
    let link = null;
    link = await this.linksModel.findOne({ url: url }).exec();
    return link === null ? false : true;
  }

  async createLink(input: CreateLinkInput): Promise<Link> {
    const link = new this.linksModel({
      url: input.url,
    });
    await link.save();
    return link;
  }
}
