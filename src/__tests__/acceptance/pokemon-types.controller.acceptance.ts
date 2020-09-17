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

  before('setupDatabase', async () => {
    await clearDatabase();
    await setupDatabase();
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /pokemon-types', async () => {
    const res = await client.get(`/pokemon-types`).expect(200);
    expect(res.body).to.be.length(3);
    expect(res.body[0].name).to.equal('Grass');
    expect(res.body[1].name).to.equal('Poison');
    expect(res.body[2].name).to.equal('Fire');
  });
});
