import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {PokemonType, PokemonTypeRelations} from '../models';

export class PokemonTypeRepository extends DefaultCrudRepository<
  PokemonType,
  typeof PokemonType.prototype.id,
  PokemonTypeRelations
  > {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(PokemonType, dataSource);
  }
}
