import express from 'express';

import { registerUser , loginUser ,userProfile , updateProfile  , updateProfileImage } from '../controllers/UserController.js';
import { authGuard } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, userProfile);
router.put('/updateprofile', authGuard, updateProfile);
router.put('/updateprofileimage', authGuard, updateProfileImage);

export default router;
