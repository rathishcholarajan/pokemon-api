import {Client, expect} from '@loopback/testlab';
import {PokemonApplication} from '../..';
import {clearDatabase, setupDatabase} from '../helpers/database.helpers';
import {setupApplication} from './test-helper';

describe('PokemonController', () => {
  let app: PokemonApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  before('setupDatabase', async () => {
    clearDatabase();
    setupDatabase();
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /pokemon with pagination', async () => {
    const filter = {
      limit: 2,
      offset: 1
    };
    const res = await client.get(`/pokemon?filter=${JSON.stringify(filter)}`)
      .expect(200);
    expect(res.body).to.be.length(2);
    expect(res.body[0].name).to.equal('Ivysaur');
    expect(res.body[1].name).to.equal('Venusaur');
  });

  it('invokes GET /pokemon with case insensitive search by pokemon name', async () => {
    let searchTerm = "bUlB";
    const filter = {
      where: {
        name: {
          regexp: `/${searchTerm}/i`
        }
      }
    };
    const res = await client.get(`/pokemon?filter=${JSON.stringify(filter)}`)
      .expect(200);
    expect(res.body).to.be.length(1);
    expect(res.body[0].name).to.equal('Bulbasaur');
  });

  it('invokes GET /pokemon with filter by pokemon type', async () => {
    const filter = {
      where: {
        types: "Fire"
      }
    };
    const res = await client.get(`/pokemon?filter=${JSON.stringify(filter)}`)
      .expect(200);
    expect(res.body).to.be.length(1);
    expect(res.body[0].name).to.equal('Charmander');
  });

  it('invokes GET /pokemon with filter by favorite', async () => {
    const filter = {
      where: {
        id: {
          inq: ["2", "4"]
        }
      }
    };
    const res = await client.get(`/pokemon?filter=${JSON.stringify(filter)}`)
      .expect(200);
    expect(res.body).to.be.length(2);
    expect(res.body[0].name).to.equal('Ivysaur');
    expect(res.body[1].name).to.equal('Charmander');
  });
});
