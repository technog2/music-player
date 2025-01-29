import random      from '../../helpers/random.js';
import serverError from '../../helpers/serverError.js';

async function verification(req, res) {
	try {
		const { phone }     = req.body;
		const { TOKEN_KEY } = process.env;

		res.status(201).json({
			verificationId: random.str(24, /[a-z]|[0-9]/),
		});
	}
	catch(err) { serverError(res, err) }
}

export default verification;
