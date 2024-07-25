import express from 'express';
import { deleteUser,  getUser,  getUserListing, test, updateUser } from '../Controller/userController.js';
import { verifyToken } from '../utils/verifyToken.js';
import { deleteModel } from 'mongoose';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.get('/listings/:id',getUserListing);
router.get('/:id',getUser);

export default router;