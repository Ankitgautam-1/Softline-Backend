import express from 'express';
import { config } from 'dotenv';
import mongooose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import companiesRoute from './src/route/companiesRoute.js';
import authRoute from './src/route/Auth/Auth.js';
config();
var allowedOrigins = ['http://localhost:3000'];

const app = express();
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors((allowedOrigins = allowedOrigins)));

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
			res.send({ ok: true, message: 'server is online' });
		});
		app.use(companiesRoute);
		app.use(authRoute);
		app.listen(port, () => {
			console.log('Server is online port:', `http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
