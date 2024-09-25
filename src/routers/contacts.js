
import express from 'express';
import { getAllContactsController, getContactsByIdController,deleteContactsByIdController, patchContactsByIdController, createContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/', upload.single("photo"), validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', upload.single("photo"), isValidId,validateBody(updateContactSchema), ctrlWrapper(patchContactsByIdController));
router.delete('/:contactId',isValidId, ctrlWrapper(deleteContactsByIdController));

export default router;