import compression from 'compression';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import Routes from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
// import NotFoundError from '@exception/NotFoundError';
import { logger, stream } from '@utils/logger';
import bodyParser from 'body-parser';
import { NextFunction, Request } from 'express-serve-static-core';
import config from './config';
import { dbConnection } from '@/databases';

class App {
  public app: express.Application;
  private env: string;
  private port: string | number;
  private routes: Routes[];

  constructor(routes: Routes[]) {
    this.env = config.env || 'development';
    this.port = config.port || 3000;
    this.routes = routes;
    this.app = express();

    this.app.enable('trust proxy');

    this.app.use(require('morgan')('dev'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json({ limit: '10mb' }));

    this.connectToDatabase();
    this.initializeSendFormatToRes();
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.initializeRoutes(this.routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase = async () => {
    {
      console.log('inside the connection');
    }
    await dbConnection();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });

    // this.app.use((req: Request, res: any, next: NextFunction) => {
    // //  const err = new NotFoundError(`API not Found: ${req.method} ${req.path}`);
    //   next(err);
    // });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeSendFormatToRes() {
    // add sendformat method to res
    this.app.use(function (req: Request, res: any, next: NextFunction) {
      res.sendformat = (data: any, code = 200) => {
        if (typeof data === 'object') return res.status(code).send({ code, ...data });
        else return res.status(code).send({ code, data: data });
      };
      next();
    });
  }
}

export default App;
