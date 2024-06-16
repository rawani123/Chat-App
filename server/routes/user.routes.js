import express from 'express';
import { login, register, setAvatarImage } from '../controller/user.controllers.js';

const router = express.Router();

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/set-avatar/:id').post(setAvatarImage)

export default router;