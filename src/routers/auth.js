import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middlewares/validateBody';
import { registerUserSchema } from '../validation/auth';
import { registerUserController } from '../controllers/auth';

const router = express.Router();
const jsonParser = express.json();

router.post('/auth/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));
