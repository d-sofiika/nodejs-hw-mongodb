
import express from 'express';
import { getAllContactsController, getContactsByIdController,deleteContactsByIdController, patchContactsByIdController, createContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(patchContactsByIdController));
router.delete('/:contactId', ctrlWrapper(deleteContactsByIdController));

export default router;