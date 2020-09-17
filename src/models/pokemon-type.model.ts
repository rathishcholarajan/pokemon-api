import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {
      collection: 'pokemonTypes',
    },
  },
})
export class PokemonType extends Entity {
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

  constructor(data?: Partial<PokemonType>) {
    super(data);
  }
}

export interface PokemonTypeRelations {
  // describe navigational properties here
}

export type PokemonTypeWithRelations = PokemonType & PokemonTypeRelations;
