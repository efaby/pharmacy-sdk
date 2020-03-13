import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Ingredient} from '../models';
import {IngredientRepository} from '../repositories';

export class IngredientController {
  constructor(
    @repository(IngredientRepository)
    public ingredientRepository: IngredientRepository,
  ) {}

  @post('/ingredients', {
    responses: {
      '200': {
        description: 'Ingredient model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingredient)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredient, {
            title: 'NewIngredient',
            exclude: ['id'],
          }),
        },
      },
    })
    ingredient: Omit<Ingredient, 'id'>,
  ): Promise<Ingredient> {
    return this.ingredientRepository.create(ingredient);
  }

  @get('/ingredients/count', {
    responses: {
      '200': {
        description: 'Ingredient model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ingredient) where?: Where<Ingredient>,
  ): Promise<Count> {
    return this.ingredientRepository.count(where);
  }

  @get('/ingredients', {
    responses: {
      '200': {
        description: 'Array of Ingredient model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ingredient, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ingredient) filter?: Filter<Ingredient>,
  ): Promise<Ingredient[]> {
    return this.ingredientRepository.find(filter);
  }

  @patch('/ingredients', {
    responses: {
      '200': {
        description: 'Ingredient PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredient, {partial: true}),
        },
      },
    })
    ingredient: Ingredient,
    @param.where(Ingredient) where?: Where<Ingredient>,
  ): Promise<Count> {
    return this.ingredientRepository.updateAll(ingredient, where);
  }

  @get('/ingredients/{id}', {
    responses: {
      '200': {
        description: 'Ingredient model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ingredient, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ingredient, {exclude: 'where'}) filter?: FilterExcludingWhere<Ingredient>
  ): Promise<Ingredient> {
    return this.ingredientRepository.findById(id, filter);
  }

  @patch('/ingredients/{id}', {
    responses: {
      '204': {
        description: 'Ingredient PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredient, {partial: true}),
        },
      },
    })
    ingredient: Ingredient,
  ): Promise<void> {
    await this.ingredientRepository.updateById(id, ingredient);
  }

  @put('/ingredients/{id}', {
    responses: {
      '204': {
        description: 'Ingredient PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ingredient: Ingredient,
  ): Promise<void> {
    await this.ingredientRepository.replaceById(id, ingredient);
  }

  @del('/ingredients/{id}', {
    responses: {
      '204': {
        description: 'Ingredient DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ingredientRepository.deleteById(id);
  }
}
