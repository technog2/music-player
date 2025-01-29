import { extname } from 'path'
import multer from 'multer'
import random from '../helpers/random.js'

const storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, './src/uploads'),
	// filename: (req, file, callback) => callback(null, `${file.fieldname}-${Date.now()}-${Math.floor(Math.random() * 1e3)}-${encodeURIComponent(file.originalname)}`)
	filename: (req, file, callback) => callback(null, `${Date.now()}-${random.int(1e12, 1e13)}${extname(file.originalname)}`),
})
const upload = multer({ storage })

export default upload