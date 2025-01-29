import jwt from 'jsonwebtoken';

const { TOKEN_KEY } = process.env;

async function verifyToken(req, res, next) {
	let token = req.headers['authorization'];

	// check token exist
	if (!token) res.status(403).send({ message: 'token not found, please login' })
	else {
		token = token.split(' ')[1]; // get bearer token

		try {
			req.user = await jwt.verify(token, TOKEN_KEY); // decode the token and set the decoded token on request
			next();
		}
		catch(err) {
			console.error('Error: ', err);
			res.status(401).send({ message: 'invalid token' })
		}
	}
}

export default verifyToken;