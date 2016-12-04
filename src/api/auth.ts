import * as queryString from 'query-string';
import { checkStatus, parseJson } from './helpers';
import { IToken, IRefreshToken, IUserInfo } from '../models';

const clientId = '658047002068-gv2gr1jds2d6renups2ir74abb0r061p.apps.googleusercontent.com';
const clientSecret = 'N8ZAIlfOR4fmV1hHqk5JrUVO';
const authenticateUrl = `${location.origin}/authenticate`;

export function navigateToAuthenticator() {
	const query = queryString.stringify({
		redirect_uri: authenticateUrl,
		prompt: 'consent',
		response_type: 'code',
		client_id: clientId,
		scope: 'https://www.googleapis.com/auth/userinfo.email',
		access_type: 'offline'
	});
	window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
}

export function getToken(authorizationCode: string) : Promise<IToken> {
	return fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			['Content-Type']: 'application/x-www-form-urlencoded'
		},
		body: queryString.stringify({
			code: authorizationCode,
			redirect_uri: authenticateUrl,
			client_id: clientId,
			client_secret: clientSecret,
			scope: '',
			grant_type: 'authorization_code'
		})
	})
	.then(checkStatus)
	.then<IToken>(parseJson);
}

export function getRefreshToken(refreshToken: string) : Promise<IRefreshToken> {
	return fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			['Content-Type']: 'application/x-www-form-urlencoded'
		},
		body: queryString.stringify({
			client_secret: clientSecret,
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: clientId
		})
	})
	.then(checkStatus)
	.then<IRefreshToken>(parseJson);
}

export function getUserInfo(tokenType: string, accessToken: string) : Promise<IUserInfo> {
	return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		headers: {
			Authorization: `${tokenType} ${accessToken}`
		}
	})
	.then(checkStatus)
	.then<IUserInfo>(parseJson);
}
