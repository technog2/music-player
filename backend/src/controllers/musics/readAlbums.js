import random      from '../../helpers/random.js';
import serverError from '../../helpers/serverError.js';

async function read(req, res) {
	try {
		const albums = '123456789'.split('').map(num => ({
			id:     random.str(24, /[a-z]|[0-9]/),
			title:  `Album ${num}`,
			active: num == 1,
		}));

		res.status(200).json(albums);
	}
	catch(err) { serverError(res, err) }
}

export default read;
