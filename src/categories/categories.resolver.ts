import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from 'src/common/dtos/pagination.dto';
import { CategoryService } from './categories.service';
import { CategoriesOutput } from './dtos/categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import {
  DeleteCategoryInput,
  DeleteCategoryOutput,
} from './dtos/delete-category.dto';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './dtos/update-category.dto';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoriesOutput)
  getAllCategories(
    @Args('input') input: PaginationInput,
  ): Promise<CategoriesOutput> {
    return this.categoryService.getAllCategories(input);
  }

  @Query(() => CategoryOutput)
  findCategoryById(@Args('id') id: string): Promise<CategoryOutput> {
    return this.categoryService.findCategoryById(id);
  }

  @Query(() => CategoriesOutput)
  findCategoryByName(
    @Args('input') input: CategoryInput,
  ): Promise<CategoriesOutput> {
    return this.categoryService.findCategoryByName(input);
  }

  @Query(() => CategoriesOutput)
  findCategoryBySlug(
    @Args('input') input: CategoryInput,
  ): Promise<CategoriesOutput> {
    return this.categoryService.findCategoryBySlug(input);
  }

  @Mutation(() => CreateCategoryOutput)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => UpdateCategoryOutput)
  updateCategory(
    @Args('input') input: UpdateCategoryInput,
  ): Promise<UpdateCategoryOutput> {
    return this.categoryService.updateCategory(input);
  }

  @Mutation(() => DeleteCategoryOutput)
  deleteCategory(
    @Args('input') input: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput> {
    return this.categoryService.deleteCategory(input);
  }
}
