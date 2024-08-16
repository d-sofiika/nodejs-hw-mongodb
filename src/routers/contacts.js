
import express from 'express';
import { getAllContactsController, getContactsByIdController,deleteContactsByIdController, patchContactsByIdController, createStudentController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createStudentController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactsByIdController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsByIdController));

export default router;