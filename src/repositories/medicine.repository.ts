import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Medicine, MedicineRelations} from '../models';

export class MedicineRepository extends DefaultCrudRepository<
  Medicine,
  typeof Medicine.prototype.id,
  MedicineRelations
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Medicine, dataSource);
  }

  async findMedicine(query: string): Promise<Medicine[]> {
    const filter = {where: {}};
    let nlist: Medicine[] = [];
    if (query !== "*") {
      filter.where = {name: {nlike: query}};
      nlist = await this.find(filter);
      filter.where = {name: {like: query}};
    };
    const list = await this.find(filter);
    nlist.forEach((item) => {
      const index = item.ingredients.findIndex(ing => {
        const rex = new RegExp(query, "g");
        return ing.name.match(rex);
      });
      if (index > -1) {
        list.push(item);
      }
    })
    return list;
  }
}
