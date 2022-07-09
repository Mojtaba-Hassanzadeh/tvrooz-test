import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Movie } from 'src/movies/entities/movie.entity';
import { CreateLinkInput, CreateLinkOutput } from './dtos/create-link.dto';
import { DeleteLinkOutput } from './dtos/delete-link.dto';
import { UpdateLinkInput } from './dtos/edit-link.dto';
import { LinkOutput } from './dtos/link.dto';
import { LinksOutput } from './dtos/links.dto';
import { Link } from './entities/link.entity';
import { LinkService } from './links.service';

@Resolver(() => Link)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Query(() => LinksOutput)
  async allLinks(): Promise<LinksOutput> {
    return this.linkService.allLinks();
  }

  @Query(() => LinkOutput)
  async getLinkById(@Args('id') id: string): Promise<LinkOutput> {
    return this.linkService.getLinkById(id);
  }

  @Mutation(() => CreateLinkOutput)
  async createLink(
    @Args('input') input: CreateLinkInput,
  ): Promise<CreateLinkOutput> {
    return this.linkService.createLink(input);
  }

  @Mutation(() => LinkOutput)
  async updateLink(@Args('input') input: UpdateLinkInput): Promise<LinkOutput> {
    return this.linkService.updateLink(input);
  }

  @Mutation(() => DeleteLinkOutput)
  async deleteLink(@Args('id') id: string): Promise<DeleteLinkOutput> {
    return this.linkService.deleteLink(id);
  }
  // @Query(() => Link)
  // link() {
  //   return {
  //     url: 'https://www.google.com',
  //     //   movie: new mongoose.Types.ObjectId('62c52940260ba257f27613c3'),
  //   };
  // }
  // @ResolveField(() => Movie)
  // movie() {
  //   return {
  //     _id: '62c52940260ba257f27613c3',
  //     name: 'Harry Potter',
  //     secondaryTitle: 'and Prisoner of Azkaban',
  //   };
  // }
}
