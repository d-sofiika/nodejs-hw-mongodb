
import express from 'express';
import { getAllContactsController, getContactsByIdController } from '../controllers/contacts.js';

const router = express.Router();

router.get('/contacts', getAllContactsController);

router.get('/contacts/:contactId', getContactsByIdController);

export default router;