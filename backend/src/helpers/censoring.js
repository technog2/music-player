function censoring(text) {
	const censorWords = 'بیشعور'.split('-')
	const words = text.split(' ')
	let str = ''

	words.map(word => {
		censorWords.map(censorWord => {
			const w = word.split('').sort().filter(i => !/[\.\-\+\*]/.test(i))
			const c = censorWord.split('').sort()

			str += ' '

			if (w.toString() === c.toString()) str += '*'.repeat(word.length)
			else str += word
		})
	})

	return str
}

export default censoring