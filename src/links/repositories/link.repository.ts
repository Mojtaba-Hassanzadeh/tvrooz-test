import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkInput } from '../dtos/create-link.dto';
import { Link, LinkDocument } from '../entities/link.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectModel(Link.name)
    private readonly linksModel: Model<LinkDocument>,
  ) {}

  async checkUrlExists(url: string): Promise<Link> {
    return await this.linksModel.findOne({ url: url }).exec();
  }

  async createLink(input: CreateLinkInput): Promise<Link> {
    const link = new this.linksModel({
      url: input.url,
    });
    await link.save();
    return link;
  }

  async createLinkWithMovie(link: string, movie: string): Promise<Link> {
    let updatedLink: Link = null;
    updatedLink = await this.linksModel.findByIdAndUpdate(
      link,
      { movie: movie },
      { new: true },
    );
    return updatedLink;
  }

  async getLinkByMovieId(id: ObjectId): Promise<Link> {
    try {
      return await this.linksModel.findOne({ movie: id }).exec();
    } catch (error) {
      return null;
    }
  }
}
