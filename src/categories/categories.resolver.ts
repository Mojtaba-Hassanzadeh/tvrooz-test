import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './categories.service';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryOutput } from './dtos/category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
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

  @Query(() => CategoryOutput)
  findCategoryByName(@Args('name') name: string): Promise<CategoryOutput> {
    return this.categoryService.findCategoryByName(name);
  }
}
