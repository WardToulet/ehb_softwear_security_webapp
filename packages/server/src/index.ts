import Rest from './adapters/rest';
import Logic from './logic';
import InMemory from './repos/inMemory';

const {
  PORT = '80',
} = process.env;

const repo = new InMemory();
const logic = new Logic(repo);
const rest = new Rest(logic, { port: PORT });

rest.start();
