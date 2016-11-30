import { IUser, IMonth, IScore, ICurrentPeriodScores } from '../models';
import { checkStatus, parseJson } from './helpers';
import * as queryString from 'query-string';

export function createUser(name: string, account: string) {
	const query = queryString.stringify({ name, account });
	return fetch(`/api/Users/CreateUser?${query}`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: { Accept: 'application/json' }
	})
	.then(checkStatus);
}

export function getUsers() {
	return fetch('/api/Users/GetUsers', {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	})
	.then(checkStatus)
	.then<IUser[]>(parseJson);
}

export function getCurrentPeriodScores() {
	return fetch('/api/Users/GetCurrentPeriodScores', {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	})
	.then(checkStatus)
	.then<ICurrentPeriodScores>(parseJson);
}

export function getMonthScores(month: IMonth) {
	const query = queryString.stringify({
		month: month.month,
		year: month.year
	});
	return fetch(`/api/Users/GetMonthScores?${query}`, {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}

export function getYearScores(year: number) {
	const query = queryString.stringify({ year });
	return fetch(`/api/Users/GetYearScores?${query}`, {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}
