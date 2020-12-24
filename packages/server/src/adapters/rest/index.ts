import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './auth';

import { Adapter } from '../../service';
import Logic from '../../logic';

// import redirectInsecure from './middleware/redirectInsecure';
import validateJWT from './middleware/validateJWT';

type RestProps = {
  port: string | number,
  secret: string,
}

class Rest extends Adapter {
  app: express.Express;
  props: RestProps;

  constructor(logic: Logic, props: RestProps) {
    super(logic);

    this.props = props;
    this.app = express();

    // TODO: remove temporary cors
    this.app.use(cors());

    // TODO: not working on heroku
    // this.app.use(redirectInsecure);
    this.app.use(cookieParser());

    this.app.use(morgan('tiny'));

    this.app.get('/', (_req, res) => res.send('Landing page'));
    this.app.get('/test', validateJWT(props.secret), (_req, res) => res.json({ msg: 'hello world' }));
    this.app.use('/auth', authRouter(logic, props.secret));
  } 

  start() {
    this.app.listen(this.props.port, () => console.log(`Server started on port= ${this.props.port}`));
  }
}

export default Rest;
