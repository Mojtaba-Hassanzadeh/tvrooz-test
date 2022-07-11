import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoryService } from 'src/categories/categories.service';
import {
  Category,
  CategorySchema,
} from 'src/categories/entities/category.entity';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import { Link, LinkSchema } from 'src/links/entities/link.entity';
import { LinksModule } from 'src/links/links.module';
import { LinkService } from 'src/links/links.service';
import { LinkRepository } from 'src/links/repositories/link.repository';
import { Movie, MoviewSchema } from './entities/movie.entity';
import { MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MoviewSchema }]),
    CategoriesModule,
    LinksModule,
  ],
  providers: [MovieResolver, MovieService, MovieRepository],
})
export class MoviesModule {}
