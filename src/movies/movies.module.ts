import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MoviewSchema } from './entities/movie.entity';
import { MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MoviewSchema }]),
  ],
  providers: [MovieResolver, MovieService],
})
export class MoviesModule {}
