import UserModel from '../Model/UserModel.js';
import bcrypt from 'bcrypt';
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({
		email: email,
	});
	if (user) {
		const deCrpytPassword = await bcrypt.compare(
			password.toString(),
			user.password.toString()
		);

		if (deCrpytPassword) {
			res.status(200).send({ ok: true, mesage: 'password is correct' });
		} else {
			res.status(400).send({
				ok: false,
				mesage: 'password is incorrect',
			});
		}
	} else {
		res.status(400).send({ ok: false, mesage: 'No user is found' });
	}
};
const registerUser = async (req, res) => {
	const { email, password } = req.body;
	const userExist = await UserModel.findOne({
		email: email,
	});
	if (userExist) {
		res.status(403).send({ ok: false, message: 'User already exit' });
	} else {
		const passwordCrpyt = await bcrypt.hash(password, 10);
		const newUser = await UserModel({
			email: email,
			password: passwordCrpyt,
		});
		newUser.save();
		res.status(200).send({ ok: true, message: newUser });
	}
};

export default loginUser;

export { registerUser };
