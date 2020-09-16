import {Entity, model, property} from '@loopback/repository';

@model()
export class PokemonEvolutionRequirement extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<PokemonEvolutionRequirement>) {
    super(data);
  }
}
