import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerUserSchema,requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshController,requestResetEmailController, registerUserController, resetPasswordController, getOauthURLController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginSchema), ctrlWrapper(loginUserController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/send-reset-email', jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController))
router.post('/reset-pwd', jsonParser,validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController))

router.get("/get-oauth-url", ctrlWrapper(getOauthURLController));

export default router;