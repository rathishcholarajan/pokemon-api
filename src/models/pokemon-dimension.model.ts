import {Entity, model, property} from '@loopback/repository';

@model()
export class PokemonDimension extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  minimum: string;

  @property({
    type: 'string',
    required: true,
  })
  maximum: string;

  constructor(data?: Partial<PokemonDimension>) {
    super(data);
  }
}
