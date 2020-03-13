import {Entity, model, property} from '@loopback/repository';
import {Ingredient} from './ingredient.model';

@model()
export class Medicine extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  posology: string;

  @property({
    type: 'date',
    required: true,
  })
  expire: string;

  @property.array(Ingredient)
  ingredients: Ingredient[];

  constructor(data?: Partial<Medicine>) {
    super(data);
  }
}

export interface MedicineRelations {
  // describe navigational properties here
}

export type MedicineWithRelations = Medicine & MedicineRelations;
