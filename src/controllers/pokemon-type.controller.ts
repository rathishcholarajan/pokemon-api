import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {PokemonType} from '../models';
import {PokemonTypeRepository} from '../repositories';

export class PokemonTypeController {
  constructor(
    @repository(PokemonTypeRepository)
    public pokemonTypeRepository: PokemonTypeRepository,
  ) {}

  /*
   * Get all pokemon types
   */
  @get('/pokemon-types', {
    responses: {
      '200': {
        description: 'Array of PokemonType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PokemonType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PokemonType) filter?: Filter<PokemonType>,
  ): Promise<PokemonType[]> {
    return this.pokemonTypeRepository.find(filter);
  }
}
