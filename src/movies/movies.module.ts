import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from 'src/categories/categories.service';
import {
  Category,
  CategorySchema,
} from 'src/categories/entities/category.entity';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import { Link, LinkSchema } from 'src/links/entities/link.entity';
import { LinkService } from 'src/links/links.service';
import { LinkRepository } from 'src/links/repositories/link.repository';
import { Movie, MoviewSchema } from './entities/movie.entity';
import { MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MoviewSchema }]),
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [
    MovieResolver,
    MovieService,
    MovieRepository,
    LinkService,
    LinkRepository,
    CategoryService,
    CategoryRepository,
  ],
})
export class MoviesModule {}
