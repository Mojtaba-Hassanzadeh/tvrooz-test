import { Module } from '@nestjs/common';
import { LinkService } from './links.service';
import { LinkResolver } from './links.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './entities/link.entity';
import { LinkRepository } from './repositories/link.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  exports: [LinkService, LinkRepository, MongooseModule],
  providers: [LinkService, LinkResolver, LinkRepository],
})
export class LinksModule {}
