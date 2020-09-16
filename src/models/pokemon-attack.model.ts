import {Entity, model, property} from '@loopback/repository';
import {PokemonAttackMove} from '.';

@model()
export class PokemonAttack extends Entity {
  @property.array(PokemonAttackMove, {
    required: true,
  })
  fast: PokemonAttackMove[];

  @property.array(PokemonAttackMove, {
    required: true,
  })
  special: PokemonAttackMove[];

  constructor(data?: Partial<PokemonAttack>) {
    super(data);
  }
}
