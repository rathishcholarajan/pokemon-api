import fs from 'fs';
import path from 'path';
import {
  PokemonRepository,
  PokemonTypeRepository,
  UserRepository,
} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export const mockPokemonRepository = new PokemonRepository(testdb);
export const mockPokemonTypeRepository = new PokemonTypeRepository(testdb);
export const mockUserRepository = new UserRepository(testdb);

export async function clearDatabase() {
  await mockPokemonRepository.deleteAll();
  await mockPokemonTypeRepository.deleteAll();
  await mockUserRepository.deleteAll();
}

export async function setupDatabase() {
  const samplePokemonJsonFile = path.join(
    __dirname,
    '../fixtures/sample-pokemon.json',
  );
  const samplePokemonJsonString = fs.readFileSync(
    samplePokemonJsonFile,
    'utf8',
  );
  const samplePokemonArray = JSON.parse(samplePokemonJsonString);

  for (const samplePokemon of samplePokemonArray) {
    await mockPokemonRepository.create(samplePokemon);
  }

  await mockPokemonTypeRepository.create({name: 'Grass'});
  await mockPokemonTypeRepository.create({name: 'Poison'});
  await mockPokemonTypeRepository.create({name: 'Fire'});

  await mockUserRepository.create({
    firstName: 'John',
    lastName: 'Doe',
    favoritePokemon: ['1', '2'],
  });
}
