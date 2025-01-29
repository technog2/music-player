export interface AlertInfo {
	show:    boolean
	type:    string
	content: string
}

export const useAlert = (alertInfo: { value: AlertInfo }) => {
	const success = (content: string) => show('success', content);
	const warning = (content: string) => show('warning', content);
	const error   = (content: string) => show('error',   content);

	function show(
		type:    string, 
		content: string
	) {
		alertInfo.value.show    = true;
		alertInfo.value.type    = type;
		alertInfo.value.content = content;

		setTimeout(
			() => alertInfo.value.show = false, 
			5000
		);
	}

	return {
		success,
		warning,
		error,
	}
}

export default useAlert;