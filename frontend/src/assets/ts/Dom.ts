export const useDom = () => {
	function focus(id: string) {
		document.getElementById(id)?.focus();
	}

	return {
		focus,
	}
}

export default useDom();