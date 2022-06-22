import express from 'express';
import { config } from 'dotenv';
import mongooose from 'mongoose';
import helmet from 'helmet';
import loginUser, { registerUser } from './src/route/userRoute.js';

config();

const app = express();
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const mongourl = process.env.MONGO_URL;
const port = process.env.PORT;

mongooose
	.connect(mongourl, { dbName: 'Softline' })
	.then((con) => {
		app.get('/', async (req, res) => {
			res.send({ ok: true, message: 'server is online' });
		});

		app.listen(port, () => {
			console.log('Server is online');
		});
		app.post('/auth/login', loginUser);
		app.post('/auth/register', registerUser);
	})
	.catch((err) => {
		app.listen(port, () => {
			console.log('Server is offline', err);
		});
		console.log('server is offline ', err);
	});