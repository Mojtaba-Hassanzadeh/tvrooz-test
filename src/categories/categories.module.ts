import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryResolver } from './categories.resolver';
import { CategoryService } from './categories.service';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [CategoryService, CategoryRepository, MongooseModule],
  providers: [CategoryService, CategoryResolver, CategoryRepository],
})
export class CategoriesModule {}
