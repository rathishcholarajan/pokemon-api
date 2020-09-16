import {
  Filter,
  repository
} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, param} from '@loopback/rest';
import {Pokemon} from '../models';
import {PokemonRepository} from '../repositories';

export class PokemonController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  /*
   * Query all pokemon with pagination, search by name, filter by type, etc.
   * and also filter the fields returned
   */
  @get('/pokemon', {
    responses: {
      '200': {
        description: 'Array of Pokemon model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pokemon, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pokemon) filter?: Filter<Pokemon>,
  ): Promise<Pokemon[]> {
    return this.pokemonRepository.find(filter);
  }

  /*
   * Query one pokemon by either id or case insensitive name,
   * throws not found error if there is not match
   */
  @get('/pokemon/{idOrName}', {
    responses: {
      '200': {
        description: 'Pokemon model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pokemon),
          },
        },
      },
    },
  })
  async findByIdOrName(
    @param.path.string('idOrName') idOrName: string
  ): Promise<Pokemon> {
    let key: string, query: object;
    if (isNaN(parseInt(idOrName))) {
      key = 'name';
      query = {regexp: new RegExp(`^${idOrName}$`, 'i')};
    } else {
      key = 'id';
      query = {eq: idOrName};
    }

    return this.pokemonRepository.findOne({where: {[key]: query}}).then(pokemon => {
      if (!pokemon) {
        throw new HttpErrors.NotFound(`Pokemon not found for ${key}: ${idOrName}.`);
      }
      return pokemon;
    });
  }
}
