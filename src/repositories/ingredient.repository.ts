import {DefaultCrudRepository} from '@loopback/repository';
import {Ingredient, IngredientRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IngredientRepository extends DefaultCrudRepository<
  Ingredient,
  typeof Ingredient.prototype.id,
  IngredientRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Ingredient, dataSource);
  }
}
