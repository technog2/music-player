import random      from '../../helpers/random.js';
import serverError from '../../helpers/serverError.js';

async function read(req, res) {
	try {
		const albums = '123456789'.split('').map(num => ({
			id:     random.str(24, /[a-z]|[0-9]/),
			title:  `Album ${num}`,
			active: num == 1,
			musics: rtnMusics(num),
		}));

		function rtnMusics(n) {
			const arr = 'exil-zang-fade&Frozen&I Believe in You&You instrumental'.split('&');
			return '123456789'.split('').map(num => {
				num = (parseInt(num) + parseInt(n - 1)) % 10;

				return {
					id:      random.str(24, /[a-z]|[0-9]/),
					title:   `Music ${num}`,
					artist:  num % 3 !== 0 ? 'Hiboky' : 'Feild',
					poster:  `http://localhost:3000/src/assets/images/img-${num}.jpg`,
					src:     `http://localhost:3000/src/assets/musics/${arr[num % 4]}.mp3`,
					isLiked: num % 3 === 0,
				}
			});
		}

		res.status(200).json(albums);
	}
	catch(err) { serverError(res, err) }
}

export default read;
