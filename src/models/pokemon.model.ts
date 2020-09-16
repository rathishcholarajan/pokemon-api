import {Entity, model, property} from '@loopback/repository';
import {
  PokemonAttack, PokemonDimension, PokemonEvolutionRequirement
} from '.';

@model({
  settings: {
    mongodb: {
      collection: 'pokemon'
    },
  },
})
export class Pokemon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  objectId?: string;

  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  classification: string;

  @property({
    type: 'number',
    required: true,
  })
  fleeRate: number;

  @property({
    type: 'number',
    required: true,
  })
  maxCP: number;

  @property({
    type: 'number',
    required: true,
  })
  maxHP: number;

  @property({
    type: PokemonDimension,
    required: true,
  })
  weight: PokemonDimension;

  @property({
    type: PokemonDimension,
    required: true,
  })
  height: PokemonDimension;

  @property({
    type: PokemonEvolutionRequirement,
  })
  evolutionRequirements?: PokemonEvolutionRequirement;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  types: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  resistant: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  weaknesses: string[];

  @property({
    type: PokemonAttack,
    required: true,
  })
  attacks: PokemonAttack;

  @property({
    type: 'array',
    itemType: Pokemon,
  })
  evolutions?: Pokemon[];

  @property({
    type: 'array',
    itemType: Pokemon,
  })
  previousEvolutions?: Pokemon[];

  @property({
    type: 'string',
  })
  pokemonClass?: string;

  @property({
    type: 'string',
  })
  commonCaptureArea?: string;

  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;
