import * as queryString from 'query-string';
import { checkStatus, parseJson } from './helpers';

const redirectUrl = `${location.origin}/authenticate`;

export function getAuthenticationUrl() {
	const query = queryString.stringify({ redirectUrl });
	return fetch(`/api/Authentication/GetAuthenticationUrl?${query}`, {
		headers: {
			Accept: 'application/json'
		}
	})
	.then(checkStatus)
	.then<string>(parseJson);
}

export function getToken(authorizationCode: string) {
	const query = queryString.stringify({
		redirectUrl,
		authorizationCode
	});
	return fetch(`/api/Authentication/GetToken?${query}`, {
		headers: {
			Accept: 'application/json'
		}
	})
	.then(checkStatus)
	.then<string>(parseJson);
}
