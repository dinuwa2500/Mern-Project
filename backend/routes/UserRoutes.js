import express from 'express';

import { registerUser , loginUser ,userProfile , updateProfile  , updateProfileImage , getAllUsers , deleteUser , updateUserRoleToAdmin } from '../controllers/UserController.js';
import { authGuard , adminGuard } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, userProfile);
router.put('/updateprofile/:userId', authGuard, updateProfile);
router.put('/updateprofileimage', authGuard, updateProfileImage);
router.delete('/:userId', authGuard, adminGuard, deleteUser);
router.get('/', authGuard, adminGuard, getAllUsers);
router.put('/users/:userId/role/admin', authGuard, adminGuard, updateUserRoleToAdmin);

export default router;
