import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

export const createExpressApp = () => {
  const app = express();

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      cors: ['http://localhost:3000', process.env.CORS_ORIGIN],
    })
  );

  return app;
};

export const createSocketIOApp = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', process.env.CORS_ORIGIN],
      methods: ['GET', 'POST'],
    },
  });

  return io;
};
