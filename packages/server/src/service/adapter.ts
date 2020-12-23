import Logic from '../logic';

export default abstract class Adapter {
  logic: Logic;

  constructor(logic: Logic) {
    this.logic = logic;
  }

  start(): void {}
}
