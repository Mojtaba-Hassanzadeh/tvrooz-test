import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import mongoose, { ObjectId } from 'mongoose';
import { Movie } from 'src/movies/entities/movie.entity';
import { Link } from './entities/link.entity';

@Resolver(() => Link)
export class LinkResolver {
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
