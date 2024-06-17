import express from 'express';
import { addMessage, getAllMessages } from '../controller/messages.controllers.js';

const router = express.Router();


router.route('/add-message').post(addMessage)

router.route('/get-all-messages').post(getAllMessages)

export default router;