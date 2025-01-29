import { fileURLToPath } from 'url'
import { dirname } from 'path'

class FileDirName {
	static get __filename() { return fileURLToPath(import.meta.url) }
	static get __dirname() { return dirname(this.__filename) }
}

export default FileDirName