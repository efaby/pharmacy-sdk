import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Medicine} from '../models';
import {MedicineRepository} from '../repositories';

export class MedicineController {
  constructor(
    @repository(MedicineRepository)
    public medicineRepository: MedicineRepository,
  ) {}

  @post('/medicines', {
    responses: {
      '200': {
        description: 'Medicine model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medicine)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicine, {
            title: 'NewMedicine',
            exclude: ['id'],
          }),
        },
      },
    })
    medicine: Omit<Medicine, 'id'>,
  ): Promise<Medicine> {
    return this.medicineRepository.create(medicine);
  }

  @get('/medicines/count', {
    responses: {
      '200': {
        description: 'Medicine model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Medicine) where?: Where<Medicine>,
  ): Promise<Count> {
    return this.medicineRepository.count(where);
  }

  @get('/medicines', {
    responses: {
      '200': {
        description: 'Array of Medicine model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Medicine, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Medicine) filter?: Filter<Medicine>,
  ): Promise<Medicine[]> {
    return this.medicineRepository.find(filter);
  }

  @patch('/medicines', {
    responses: {
      '200': {
        description: 'Medicine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicine, {partial: true}),
        },
      },
    })
    medicine: Medicine,
    @param.where(Medicine) where?: Where<Medicine>,
  ): Promise<Count> {
    return this.medicineRepository.updateAll(medicine, where);
  }

  @get('/medicines/{id}', {
    responses: {
      '200': {
        description: 'Medicine model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Medicine, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Medicine, {exclude: 'where'}) filter?: FilterExcludingWhere<Medicine>
  ): Promise<Medicine> {
    return this.medicineRepository.findById(id, filter);
  }

  @patch('/medicines/{id}', {
    responses: {
      '204': {
        description: 'Medicine PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicine, {partial: true}),
        },
      },
    })
    medicine: Medicine,
  ): Promise<void> {
    await this.medicineRepository.updateById(id, medicine);
  }

  @put('/medicines/{id}', {
    responses: {
      '204': {
        description: 'Medicine PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() medicine: Medicine,
  ): Promise<void> {
    await this.medicineRepository.replaceById(id, medicine);
  }

  @del('/medicines/{id}', {
    responses: {
      '204': {
        description: 'Medicine DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.medicineRepository.deleteById(id);
  }

  @get('/medicines/search/{query}', {
    responses: {
      '200': {
        description: "Array of Medicines found",
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Medicine}},
          },
        },
      },
    },
  })
  async findMedicine(
    @param.path.string('query') query: string
  ): Promise<Medicine[]> {
    return this.medicineRepository.findMedicine(query);
  }
}
