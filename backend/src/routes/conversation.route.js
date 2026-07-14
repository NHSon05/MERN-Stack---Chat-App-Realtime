import express, { Router } from 'express';
import {
    createConversation,
    getConversations,
    getMessages,
    markAsSeen,
} from '../controllers/conversation.controller.js';
import { checkFriendShip } from '../middlewares/friend.middlewares.js';

const router = express.Router();

router.post('/', checkFriendShip, createConversation);
router.get('/', getConversations);
router.get('/:conversationId/messages', getMessages);
router.patch('/:conversationId/seen', markAsSeen);

export default router;
