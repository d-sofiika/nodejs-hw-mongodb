import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
export const setupServer = () => {
    const server = express();
    server.use(express.json())
    server.use(cors());
    
    const PORT = process.env.PORT || 3000;
    
    server.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
   
        server.use('/contacts', contactsRouter);

    
         server.use('*', notFoundHandler);

server.use(errorHandler);

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}