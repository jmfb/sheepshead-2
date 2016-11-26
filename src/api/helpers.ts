export function checkStatus(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		throw new Error(response.statusText);
	}
}

export function parseJson(response: Response) {
	return response.json();
}
