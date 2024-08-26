
import express from 'express';
import { getAllContactsController, getContactsByIdController,deleteContactsByIdController, patchContactsByIdController, createContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId',isValidId,validateBody(updateContactSchema), ctrlWrapper(patchContactsByIdController));
router.delete('/:contactId',isValidId, ctrlWrapper(deleteContactsByIdController));

export default router;