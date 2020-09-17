import {Filter, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  put,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  /*
   * Get all users
   */
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  /*
   * Favorite pokemon for user
   */
  @put('/users/{userId}/favorite-pokemon/{pokemonId}', {
    responses: {
      '204': {
        description: 'Favorite pokemon success',
      },
    },
  })
  async replaceById(
    @param.path.string('userId') userId: string,
    @param.path.string('pokemonId') pokemonId: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpErrors.NotFound(`User not found for id: ${userId}`);
    }
    // Favorite pokemon
    if (user.favoritePokemon && Array.isArray(user.favoritePokemon)) {
      if (!user.favoritePokemon.includes(pokemonId)) {
        user.favoritePokemon.push(pokemonId);
      }
    } else {
      user.favoritePokemon = [pokemonId];
    }
    await this.userRepository.updateById(userId, user);
  }

  /*
   * Unfavorite pokemon for user
   */
  @del('/users/{userId}/favorite-pokemon/{pokemonId}', {
    responses: {
      '204': {
        description: 'Unfavorite pokemon success',
      },
    },
  })
  async unfavoritePokemonForUser(
    @param.path.string('userId') userId: string,
    @param.path.string('pokemonId') pokemonId: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpErrors.NotFound(`User not found for id: ${userId}`);
    }
    // Unfavorite pokemon
    if (
      user.favoritePokemon &&
      Array.isArray(user.favoritePokemon) &&
      user.favoritePokemon.includes(pokemonId)
    ) {
      user.favoritePokemon.splice(user.favoritePokemon.indexOf(pokemonId), 1);
    }
    await this.userRepository.updateById(userId, user);
  }
}
