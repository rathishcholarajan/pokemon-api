import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import fs from 'fs';
import path from 'path';
import {PokemonRepository, PokemonTypeRepository, UserRepository} from './repositories';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class PokemonApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  // Unfortunately, TypeScript does not allow overriding methods inherited
  // from mapped types. https://github.com/microsoft/TypeScript/issues/38496
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async start(): Promise<void> {
    // Use `databaseSeeding` flag to control if pokemon should be pre-
    // populated into the database. Default is `true`.
    if (this.options.databaseSeeding !== false) {
      await this.migrateSchema();
    }
    return super.start();
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    await super.migrateSchema(options);

    let pokemonTypes: string[] = [];
    // Pre-populate pokemon
    const pokemonRepo = await this.getRepository(PokemonRepository);
    await pokemonRepo.deleteAll();
    const pokemonJsonFile = path.join(__dirname, '../data/pokemon.json');
    const pokemonJsonString = fs.readFileSync(pokemonJsonFile, 'utf8');
    const pokemonArray = JSON.parse(pokemonJsonString);

    for (const pokemon of pokemonArray) {
      if (pokemon.types && Array.isArray(pokemon.types)) {
        pokemonTypes = pokemonTypes.concat(pokemon.types);
      }
      await pokemonRepo.create(pokemon);
    }

    // Pre-populate pokemon types
    const pokemonTypeRepo = await this.getRepository(PokemonTypeRepository);
    await pokemonTypeRepo.deleteAll();
    // Get unique pokemon types
    pokemonTypes = [...new Set(pokemonTypes)];
    for (const pokemonType of pokemonTypes) {
      await pokemonTypeRepo.create({name: pokemonType});
    }

    // Pre-populate with one user to demonstrate favorite pokemon feature
    const userRepo = await this.getRepository(UserRepository);
    await userRepo.deleteAll();
    await userRepo.create({
      firstName: "John",
      lastName: "Doe",
      favoritePokemon: ["1", "10", "40", "146"]
    });
  }
}
