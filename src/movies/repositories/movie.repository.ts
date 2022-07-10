import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LinkRepository } from "src/links/repositories/link.repository";
import { CreateMovieInput } from "../dtos/create-movie.dto";
import { Movie, MovieDocument } from "../entities/movie.entity";


@Injectable()
export class MovieRepository {
    constructor(
        @InjectModel(Movie.name)
        private readonly moviesRepo: Model<MovieDocument>,
        private readonly linkRepo: LinkRepository
    ) {}

    async createMovie(input: CreateMovieInput): Promise<Movie> {
        let movie: Movie = null
        if(input.link) {
            

        }
        if(input.categories.length > 0) {
        }
        movie.name = input.name
        movie.secondaryTitle = input.secondaryTitle
        return movie
        let category = await this.categoriesModel
          .findOne({ slug: categorySlug })
          .exec();
    
        if (!category) {
          category = new this.categoriesModel({
            name: categoryName,
            slug: categorySlug,
          });
          await category.save();
        }
    
        return movie;
      }
}