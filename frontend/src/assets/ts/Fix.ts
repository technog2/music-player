import emojis from './emoji-array';

export const useFix = () => {
	function number(num: number): string | undefined {
		if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
		if (num >= 1e9)  return (num / 1e9).toFixed(1) + 'G';
		if (num >= 1e6)  return (num / 1e6).toFixed(1) + 'M';
		if (num >= 1e3)  return (num / 1e3).toFixed(1) + 'K';
		if (num >= 0)    return num + '';
	}

	function paragraph(par: string): string {
		type Arr = RegExpMatchArray | null;

		const tags:     Arr = par.match(/#+[A-Za-z0-9ا-ی_]{1,1000}/g);
		const mentions: Arr = par.match(/@+[A-Za-z0-9_]{1,24}/g);
		const urls:     Arr = par.match(/(http|data)+[A-Za-z0-9_\-\/\\\:\?\{\}\.\,\;\&\$\@\#]{10,10000}/g);

		tags    ?.map(tag     => par = par.replace(tag, `<a href="/search?query=%23${tag.slice(1)}" class="link text-sky-500">${tag}</a>`));
		mentions?.map(mention => par = par.replace(mention, `<a href="/${mention}" class="link text-sky-500" dir="ltr">${mention}</a>`));
		urls    ?.map(url     => par = par.replace(url, `<a href="${url}" target="_blank" class="text-sky-500" dir="ltr">${url}</a>`));
		emojis  ?.map(emoji   => par = par.replaceAll(emoji, `<span class="emoji">${emoji}</span>`));

		return par;
	}

	function string(str: string): string {
		if (str.length > 10) return str.substring(0, 7) + '...';
		else return str;
	}

	function time(timestamp: any): string {
		const date:    Date   = new Date(timestamp);
		const now:     Date   = new Date();
		const seconds: number = Math.floor((now - date) / 1000);
		const minutes: number = Math.floor(seconds / 60);
		const hours:   number = Math.floor(minutes / 60);
		const days:    number = Math.floor(hours / 24);
		const weeks:   number = Math.floor(days / 7);
		const months:  number = Math.floor(days / 30);
		const years:   number = Math.floor(days / 365);

		if (seconds < 60)      return `${seconds} ثانیه پیش`;
		else if (minutes < 60) return `${minutes} دقیقه پیش`;
		else if (hours < 24)   return `${hours} ساعت پیش`;
		else if (days < 7)     return `${days} روز پیش`;
		else if (weeks <= 4)   return `${weeks} هفته پیش`;
		else if (months < 12)  return `${months} ماه پیش`;
		else                   return `${years} سال پیش`;
	}

	return {
		number,
		paragraph,
		string,
		time,
	}
}

export default useFix();