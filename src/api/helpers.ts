import { history } from '~/index';

export function checkStatus(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		response.json().then(error => {
			history.push('/error', {
				status: response.status,
				statusText: response.statusText,
				error
			});
		});
		throw new Error(response.statusText);
	}
}

export function parseJson(response: Response) {
	return response.json();
}

export function authHeader() {
	const token = localStorage.getItem('token');
	return `Token ${token}`;
}
