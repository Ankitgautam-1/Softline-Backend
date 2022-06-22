import axios from 'axios';
const getCompanies = async (req, res) => {
	try {
		const companies = await axios.get(
			'https://softline1.freshservice.com/api/v2/departments',
			{
				auth: {
					username: process.env.API_KEY,
				},
			}
		);
		if (!companies.error) {
			res.status(200).send({ ok: true, companies: companies.data });
		} else {
			res.status(400).send({ ok: false, error: companies.error });
		}
	} catch (error) {
		res.status(400).send({ ok: false, error: error });
	}
};

export default getCompanies;
