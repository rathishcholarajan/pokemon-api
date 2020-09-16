import {Entity, model, property} from '@loopback/repository';

@model()
export class PokemonAttackMove extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  damage: number;

  constructor(data?: Partial<PokemonAttackMove>) {
    super(data);
  }
}
