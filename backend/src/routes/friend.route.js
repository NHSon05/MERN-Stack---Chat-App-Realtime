import express from 'express';
import {
    acceptFriendRequest,
    sendFriendRequest,
    declineFriendRequest,
    deleteFriend,
    getAllFriends,
    getAllFriendsRequest,
} from '../controllers/friend.controller.js';

const router = express.Router();

router.post('/request', sendFriendRequest);
router.post('/request/:requestId/accept', acceptFriendRequest);
router.post('/request/:requestId/decline', declineFriendRequest);
router.delete('/:friendId', deleteFriend);
router.get('/', getAllFriends);
router.get('/requests', getAllFriendsRequest);

export default router;
