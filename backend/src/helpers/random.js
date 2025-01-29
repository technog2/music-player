class Random {
	int(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	float(min, max, fix) {
		let num = Math.random() * (max - min) + min;
		if (fix) num = num.toFixed(fix);
		return +num;
	}

	str(length, customRange) {
		const range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz01234567879.+-=_';
		const chars = customRange ? range.match(new RegExp(customRange, 'g')).join('') : range;
		let   str   = '';

		for (let n = 0; n < length; n++) { str += chars[this.int(0, chars.length)]; }
		return str;
	}

	bool() {
		return !!this.int(0, 2);
	}
}

export default new Random;