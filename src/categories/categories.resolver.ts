import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './categories.service';
import { CategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { DeleteCategoryOutput } from './dtos/delete-category.dto';
import { EditCategoryInput } from './dtos/edit-category.dto';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoriesOutput)
  allCategories(): Promise<CategoriesOutput> {
    return this.categoryService.allCategories();
  }

  @Query(() => CategoryOutput)
  findCategoryById(@Args('id') id: string): Promise<CategoryOutput> {
    return this.categoryService.findCategoryById(id);
  }

  @Mutation(() => CreateCategoryOutput)
  async createAccount(
    @Args('input') input: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
      return this.categoryService.createCategory(input);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(() => CategoriesOutput)
  findCategoryByName(
    @Args('input') input: CategoryInput,
  ): Promise<CategoriesOutput> {
    return this.categoryService.findCategoryByName(input);
  }

  @Mutation(() => CategoryOutput)
  updateCategoryById(
    @Args('input') input: EditCategoryInput,
  ): Promise<CategoryOutput> {
    return this.categoryService.updateCategoryById(input);
  }

  @Mutation(() => DeleteCategoryOutput)
  deleteCategoryById(@Args('id') id: string): Promise<DeleteCategoryOutput> {
    return this.categoryService.deleteCategoryById(id);
  }
}
