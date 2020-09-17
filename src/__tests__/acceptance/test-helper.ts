import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {PokemonApplication} from '../..';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new PokemonApplication({
    rest: restConfig,
    databaseSeeding: false
  });

  await app.boot();
  app.dataSource(testdb);
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: PokemonApplication;
  client: Client;
}
