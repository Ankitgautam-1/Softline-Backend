import express from 'express';
import { config } from 'dotenv';
import mongooose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';

import authRoute from './src/controller/auth.js';
import verifyAccessToken from './src/middlewares/verifyAccessToken.js';
import cookieParser from 'cookie-parser';
import contractRoute from './src/route/contract/contractRoute.js';
import companiesRoute from './src/route/company/companiesRoute.js';
config();
var allowedOrigins = ['http://localhost:3000'];

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST'],
	})
);

const mongourl = process.env.MONGO_URL;
const port = process.env.PORT;
const db = process.env.DB_NAME;
const options = {
	dbName: db,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
mongooose
	.connect(mongourl, options)
	.then((con) => {
		app.get('/', async (req, res) => {
			var expires = new Date(Date.now() + 3600 * 1000).toUTCString();
			// res.cookie('accessToken', `Bearer ${accessToken}`, {
			// 		expires:new Date.now()+60
			// });
			req.body.req.res.send({ ok: true, message: 'server is online' });
		});
		app.use(authRoute);

		app.use(verifyAccessToken, contractRoute);

		app.use(verifyAccessToken, companiesRoute);

		app.listen(port, () => {
			console.log('Server is online port:', `http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
