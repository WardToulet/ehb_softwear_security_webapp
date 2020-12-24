import Rest from './adapters/rest';
import Logic from './logic';
import InMemory from './repos/inMemory';

import { NewAccount } from '@ss/types';

const {
  PORT = '80',
  SECRET = 'test',
} = process.env;

const wardToulet: NewAccount = {
  email: 'ward@toulet.net',
  password: 'testtest',
}

const repo = new InMemory();
const logic = new Logic(repo);

// Seed my account for development
logic.registerAccount(wardToulet);

const rest = new Rest(logic, { port: PORT, secret: SECRET });

rest.start();
