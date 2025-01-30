export const useFix = () => {
	function number(num: number): string | undefined {
		if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
		if (num >= 1e9)  return (num / 1e9) .toFixed(1) + 'G';
		if (num >= 1e6)  return (num / 1e6) .toFixed(1) + 'M';
		if (num >= 1e3)  return (num / 1e3) .toFixed(1) + 'K';
		if (num >= 0)    return num + '';
	}

	function string(str: string): string {
		if (str.length > 10) return str.substring(0, 7) + '...';
		else return str;
	}

	return {
		number,
		string,
	}
}

export default useFix();