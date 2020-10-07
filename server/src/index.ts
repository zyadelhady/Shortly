import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';
import linksRouter from './linksRouter';
import dotenv from 'dotenv';
import cors from 'cors';

process.on('uncaughtException', (err: any) => {
  console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './.env' });

createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['./dist/*.js'],
})
  .then((conn) => {
    const app = express();
    app.use(express.json());

    app.use(cors());
    app.options('*', cors());
    app.use(cors({ origin: 'https://shortly-gold.now.sh', credentials: true }));

    app.use('/api/v1/links/', linksRouter);

    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log(`App running on http://127.0.0.1:${port}`);
    });

    process.on('unhandledRejection', (err: any) => {
      console.log('UNHANDLER REJECTION! SHUTTING DOWN......');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('Process terminated!');
      });
    });
  })
  .catch((e) => console.log(e));
