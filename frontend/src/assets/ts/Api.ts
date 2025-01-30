interface Response {
	ok:   boolean
	data: any
}

export function useApi(loadingStore?: any) {
	async function request(
		method: string, 
		path:   string, 
		body?:   any,
		opts?: {
			var?:        any, 
			query?:      any,
			loading?:    string,
			loadingVar?: any
		}
	): Promise<Response> {
		const loading = {
			name: opts?.loading?.split(':')[0],
			key:  opts?.loading?.split(':')[1],
		}

		loadingStore?.turn(loading.name, loading.key, true);
		if (opts?.loadingVar) opts.loadingVar.value = true;

		try {
			let url = `http://localhost:4000/v1${path}`;
			if (opts?.query) {
				const str: string = Object
					.entries(opts.query)
					.map(q => q.join('='))
					.join('&');

				if (str) url += `?${str}`;
			}

			const res = await fetch(url, {
				method,
				body: !!body ? JSON.stringify(body) : null,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
				},
			});
			const data = await res.json();

			if (opts?.var) opts.var.value = data;

			return { 
				ok: res.ok, 
				data: data,
			}
		}
		catch(err) {
			console.error(err);

			return { 
				ok: false, 
				data: err,
			}
		}
		finally {
			loadingStore?.turn(loading.name, loading.key, false);
			if (opts?.loadingVar) opts.loadingVar.value = false;
		}
	}

	const get     = async (path: string, opts?: any)            => request('GET'   , path, null, opts);
	const post    = async (path: string, body: any, opts?: any) => request('POST'  , path, body, opts);
	const put     = async (path: string, body: any, opts?: any) => request('PUT'   , path, body, opts);
	const patch   = async (path: string, body: any, opts?: any) => request('PATCH' , path, body, opts);
	const _delete = async (path: string, body: any, opts?: any) => request('DELETE', path, body, opts);

	return {
		get,
		post,
		put,
		patch,
		delete: _delete,
	}
}

export default useApi();