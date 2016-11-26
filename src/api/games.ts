import { IScore, IGame, IGames } from '../models';
import { checkStatus, parseJson } from './helpers';
import * as queryString from 'query-string';

export function updateGame(id: number, when: string, scores: IScore[]) : Promise<number> {
	return fetch(`/api/Games/UpdateGame`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify({
			id,
			when,
			scores
		})
	}).then(checkStatus).then(parseJson);
}

export function getGame(id: number) : Promise<IGame> {
	const query = queryString.stringify({ id });
	return fetch(`/api/Games/GetGame?${query}`, {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	}).then(checkStatus).then(parseJson);
}

export function deleteGame(id: number) : Promise<{}> {
	const query = queryString.stringify({ id });
	return fetch(`/api/Games/DeleteGame?${query}`, {
		credentials: 'same-origin',
		method: 'DELETE',
		headers: { Accept: 'application/json' }
	}).then(checkStatus);
}

export function getGames(skip: number, take: number) : Promise<IGames> {
	const query = queryString.stringify({ skip, take });
	return fetch(`/api/Games/GetGames?${query}`, {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	}).then(checkStatus).then(parseJson);
}
