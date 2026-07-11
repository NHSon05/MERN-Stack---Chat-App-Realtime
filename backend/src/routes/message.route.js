import express from 'express';
import {
    sendDirectMessage,
    sendGroupMessage,
} from '../controllers/message.controller.js';
import {
    checkFriendShip,
    checkGroupMembership,
} from '../middlewares/friend.middlewares.js';

const router = express.Router();

router.post('/direct', checkFriendShip, sendDirectMessage);
router.post('/group', checkGroupMembership, sendGroupMessage);

export default router;
