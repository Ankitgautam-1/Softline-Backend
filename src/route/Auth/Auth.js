import express from 'express';
import loginUser, { registerUser } from './userRoute.js';

const Router = express.Router();
const authRoute = Router.post('/register', registerUser)
	.post('/login', loginUser)
	.post('/refresh-token', async (req, res) => {
		res.status(200).json({ ok: true, message: 'Refresh Token' });
	});

export default authRoute;
