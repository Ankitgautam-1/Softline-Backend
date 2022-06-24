import express from 'express';
import getCompanies, { getServicePackage, getServicItem } from './companies.js';
const Router = express.Router();

const companiesRoute = Router.get('/api/v1/getCompanies', getCompanies)
	.get('/api/v1/getServicePackage', getServicePackage)
	.get('/api/v1/getServiceItem', getServicItem);

export default companiesRoute;
