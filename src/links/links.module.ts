import { Module } from '@nestjs/common';
import { LinkService } from './links.service';
import { LinkResolver } from './links.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './entities/link.entity';
import { LinkRepository } from './repositories/link.repository';
import { MoviesModule } from 'src/movies/movies.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { MovieService } from 'src/movies/movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    // MoviesModule,
    // MovieService,
  ],
  exports: [LinkService, LinkRepository, MongooseModule],
  providers: [LinkService, LinkResolver, LinkRepository],
})
export class LinksModule {}
