import {Client, expect} from '@loopback/testlab';
import {PokemonApplication} from '../..';
import {clearDatabase, setupDatabase} from '../helpers/database.helpers';
import {setupApplication} from './test-helper';

describe('PokemonTypesController', () => {
  let app: PokemonApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  // Resetting database for every test since the tests in
  // this file perform mutation
  beforeEach('setupDatabase', async () => {
    clearDatabase();
    setupDatabase();
  });

  after(async () => {
    await app.stop();
  });

  it('invokes PUT /users/{userId}/favorite-pokemon/{pokemonId} to favorite a pokemon', async () => {
    await client.put(`/users/3/favorite-pokemon/3`)
      .expect(204);

    const res = await client.get(`/users`)
      .expect(200);
    // db is prepopulated with 2 favorties for this user in helpers/database.helpers.ts file
    // hence checking if length is 3 since this test adds one more favorite
    expect(res.body[0].favoritePokemon).to.be.length(3);
    expect(res.body[0].favoritePokemon[2]).to.equal("3");
  });

  it('invokes DEL /users/{userId}/favorite-pokemon/{pokemonId} to unfavorite a pokemon', async () => {
    await client.delete(`/users/4/favorite-pokemon/2`)
      .expect(204);

    const res = await client.get(`/users`)
      .expect(200);
    // db is prepopulated with 2 favorties for this user in helpers/database.helpers.ts file
    // hence checking if length is 1 since this test removes a favorite pokemon
    expect(res.body[0].favoritePokemon).to.be.length(1);
  });
});
