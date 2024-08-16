import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
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
   
        server.use('/', contactsRouter);

    
    
    server.use((req, res, next) => {
        res.status(404).json({ message: 'Not found' });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}