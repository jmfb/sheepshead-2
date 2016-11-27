import { IUser, IMonth, IScore, ICurrentPeriodScores } from '../models';
import { checkStatus, parseJson } from './helpers';
import * as queryString from 'query-string';

export function createUser(name: string, account: string) : Promise<{}> {
	const query = queryString.stringify({ name, account });
	return fetch(`/api/Users/CreateUser?${query}`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: { Accept: 'application/json' }
	}).then(checkStatus);
}

export function getUsers() : Promise<IUser[]> {
	return fetch('/api/Users/GetUsers', {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	}).then(checkStatus).then(parseJson);
}

export function getCurrentPeriodScores() : Promise<ICurrentPeriodScores> {
	return fetch('/api/Users/GetCurrentPeriodScores', {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	}).then(checkStatus).then(parseJson);
}

export function getMonthScores(month: IMonth) : Promise<IScore[]> {
	const query = queryString.stringify({
		month: month.month,
		year: month.year
	});
	return fetch(`/api/Users/GetMonthScores?${query}`, {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	}).then(checkStatus).then(parseJson);
}

export function getYearScores(year: number) : Promise<IScore[]> {
	const query = queryString.stringify({ year });
	return fetch(`/api/Users/GetYearScores?${query}`, {
		credentials: 'same-origin',
		headers: { Accept: 'application/json' }
	}).then(checkStatus).then(parseJson);
}
