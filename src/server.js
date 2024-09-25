import express from 'express';
import path from "node:path"
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routers/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();
export const setupServer = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());
  server.use(cookieParser());
  
  const PORT = process.env.PORT || 3000;
server.use("/avatars", express.static(path.resolve("src", "public/avatars")))
  server.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  server.use('/contacts', contactsRouter);
server.use('/auth', authRoutes);
  server.use('*', notFoundHandler);

  server.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
