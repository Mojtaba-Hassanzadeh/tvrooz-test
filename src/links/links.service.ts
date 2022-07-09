import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkInput, CreateLinkOutput } from './dtos/create-link.dto';
import { DeleteLinkOutput } from './dtos/delete-link.dto';
import { UpdateLinkInput } from './dtos/edit-link.dto';
import { LinkOutput } from './dtos/link.dto';
import { LinksOutput } from './dtos/links.dto';
import { Link, LinkDocument } from './entities/link.entity';
import { LinkRepository } from './repositories/link.repository';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private readonly linksModel: Model<LinkDocument>,
    private readonly linkRepository: LinkRepository,
  ) {}

  async allLinks(): Promise<LinksOutput> {
    try {
      const links = await this.linksModel.find();
      return {
        ok: true,
        links,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getLinkById(id: string): Promise<LinkOutput> {
    try {
      const link = await this.linksModel.findById(id);
      if (link) {
        return {
          ok: true,
          link,
        };
      }
      return {
        ok: false,
        error: 'Link not found',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createLink(input: CreateLinkInput): Promise<CreateLinkOutput> {
    try {
      const isExists = await this.linkRepository.checkExists(input.url);
      if (isExists) {
        return { ok: false, error: 'This link already exists' };
      }
      const link = await this.linkRepository.createLink(input);
      return { ok: true, link };
    } catch (e) {
      return { ok: false, error: "Can't create link" };
    }
  }

  async updateLink(input: UpdateLinkInput): Promise<LinkOutput> {
    try {
      const link = await this.linksModel.findById(input._id);
      if (!link) {
        return {
          ok: false,
          error: 'Link not found',
        };
      }
      link.url = input.url;
      await link.save();
      return {
        ok: true,
        link,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteLink(id: string): Promise<DeleteLinkOutput> {
    try {
      const link = await this.linksModel.findById(id);
      if (!link) {
        return {
          ok: false,
          error: 'Link not found',
        };
      }
      await link.remove();
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
