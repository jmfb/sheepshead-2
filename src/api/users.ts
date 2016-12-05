import { IUser, IMonth, IScore, ICurrentPeriodScores } from '../models';
import { checkStatus, parseJson } from './helpers';
import * as queryString from 'query-string';
import * as moment from 'moment';

export function createUser(name: string, account: string) {
	const query = queryString.stringify({ name, account });
	return fetch(`/api/Users/CreateUser?${query}`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus);
}

export function getUsers() {
	return fetch('/api/Users/GetUsers', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus)
	.then<IUser[]>(parseJson);
}

export function getPeriodScores() {
	const now = moment();
	const query = queryString.stringify({
		month: now.format('MMMM'),
		year: now.year()
	});
	return fetch(`/api/Users/GetPeriodScores?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
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
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}

export function getYearScores(year: number) {
	const query = queryString.stringify({ year });
	return fetch(`/api/Users/GetYearScores?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		}
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}
