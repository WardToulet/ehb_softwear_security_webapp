import express from 'express';

import authRouter from './auth';

import { Adapter } from '../../service';
import Logic from '../../logic';

// import redirectInsecure from './middleware/redirectInsecure';

type RestProps = {
  port: string | number,
}

class Rest extends Adapter {
  app: express.Express;
  props: RestProps;

  constructor(logic: Logic, props: RestProps) {
    super(logic);

    this.props = props;
    this.app = express();

    // TODO: not working on heroku
    // app.use(redirectInsecure);

    this.app.get('/', (_req, res) => res.send('Landing page'));
    this.app.use('/auth', authRouter(logic));
  } 

  start() {
    this.app.listen(this.props.port, () => console.log(`Server started on port= ${this.props.port}`));
  }
}

export default Rest;
