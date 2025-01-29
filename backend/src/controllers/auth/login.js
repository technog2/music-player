import jwt         from 'jsonwebtoken';
import random      from '../../helpers/random.js';
import serverError from '../../helpers/serverError.js';

async function login(req, res) {
	try {
		const { cellphone } = req.body;
		const { TOKEN_KEY } = process.env;
		const refreshToken  = random.str(50);
		const accessToken   = jwt.sign(
			{ 
				id: random.str(24, /[a-z][0-9]/),
				cellphone,
			}, 
			TOKEN_KEY, 
			{ expiresIn: '30d' }
		);

		res.status(201).json({
			accessToken,
			refreshToken
		});
	}
	catch(err) { serverError(res, err) }
}

export default login;
