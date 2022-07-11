import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateLinkInput } from '../dtos/create-link.dto';
import { Link, LinkDocument } from '../entities/link.entity';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectModel(Link.name)
    private readonly linksModel: Model<LinkDocument>,
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

  async createLinkWithMovie(link: string, movie: string): Promise<Link> {
    let updatedLink: Link = null;
    updatedLink = await this.linksModel.findByIdAndUpdate(
      link,
      { movie: movie },
      { new: true },
    );
    return updatedLink;
  }

  async getLinkByMovieId(id: string): Promise<Link> {
    let link = null;
    link = await this.linksModel.findOne({ movie: id }).exec();
    return link;
  }
}
