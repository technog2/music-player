import CryptoJS from 'crypto-js'
// import serverError from '../helpers/serverError.js'

const { SECRET_KEY } = process.env

function encode(data) {
	return Buffer.from(CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()) // return encode data
}

export default encode