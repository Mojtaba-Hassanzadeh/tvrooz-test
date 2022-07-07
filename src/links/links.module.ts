import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinkResolver } from './links.resolver';

@Module({
  providers: [LinksService, LinkResolver],
})
export class LinksModule {}
