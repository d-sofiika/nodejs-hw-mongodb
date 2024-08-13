import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactsById } from './services/contacts.js';

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
    server.get('/contacts', async (req, res) => {
         try {
    const contacts = await getAllContacts();
             res.status(200).json({
        status: 200,
         message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
    });

     server.get('/contacts/:contactId', async (req, res) => {
        try {
            const contactId = req.params.contactId;
            const contact = await getContactsById(contactId);

            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found',
                });
            }

            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
     });
    
    
    server.use((req, res, next) => {
        res.status(404).json({ message: 'Not found' });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}