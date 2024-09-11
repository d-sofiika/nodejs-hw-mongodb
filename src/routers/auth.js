import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshController, registerUserController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginSchema), ctrlWrapper(loginUserController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post('/logout', ctrlWrapper(logoutUserController))

export default router;