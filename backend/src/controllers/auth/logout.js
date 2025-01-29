import jwt         from 'jsonwebtoken';
import random      from '../../helpers/random.js';
import serverError from '../../helpers/serverError.js';

async function login(req, res) {
	try {
		const { phone }     = req.body;
		const { TOKEN_KEY } = process.env;
		const refreshToken  = random.str(50);
		const accessToken   = jwt.sign(
			{ 
				id:       random.str(24, /[a-z][0-9]/),
				name:     'محمد رضایی',
				username: 'm_rezai',
				profile:  'http://localhost:4000/v1/medias/profile-default',
			}, 
			TOKEN_KEY, 
			{ expiresIn: '30d' }
		);

		res.status(201).send({
			accessToken,
			refreshToken
		});
	}
	catch(err) { serverError(res, err) }
}

export default login;
