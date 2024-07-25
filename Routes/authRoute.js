import express from 'express';
import {Google, SignIn, SignOut, Signup} from '../Controller/authController.js';

const router = express.Router();

router.post('/signup' , Signup);
router.post('/signin' , SignIn);
router.post('/google' , Google);
router.get('/signout' , SignOut);

export default router;