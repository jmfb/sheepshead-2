import { IScore, IGame, IGames } from '../models';
import { checkStatus, parseJson } from './helpers';
import * as queryString from 'query-string';

export function updateGame(id: number, when: string, scores: IScore[]) {
	return fetch(`/api/Games/UpdateGame`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`,
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify({
			id,
			when,
			scores
		})
	})
	.then(checkStatus)
	.then<number>(parseJson);
}

export function getGame(id: number) {
	const query = queryString.stringify({ id });
	return fetch(`/api/Games/GetGame?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus)
	.then<IGame>(parseJson);
}

export function deleteGame(id: number) {
	const query = queryString.stringify({ id });
	return fetch(`/api/Games/DeleteGame?${query}`, {
		credentials: 'same-origin',
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus);
}

export function getGames(skip: number, take: number) {
	const query = queryString.stringify({ skip, take });
	return fetch(`/api/Games/GetGames?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus)
	.then<IGames>(parseJson);
}
