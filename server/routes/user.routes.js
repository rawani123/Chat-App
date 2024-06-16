import express from 'express';
import { register } from '../controller/user.controllers.js';

const router = express.Router();

router.route('/register').post(register)

export default router;