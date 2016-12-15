import { IUser, IAllUserData, IMonth, IScore, IPeriodScores } from '~/models';
import { checkStatus, parseJson, authHeader } from './helpers';
import * as queryString from 'query-string';
import * as moment from 'moment';

export function updateUser(name: string, roleId: number, accounts: string[]) {
	return fetch('/api/Users/UpdateUser', {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader(),
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify({ name, roleId, accounts })
	})
	.then(checkStatus);
}

export function renameUser(oldName: string, newName: string) {
	const query = queryString.stringify({ oldName, newName });
	return fetch(`/api/Users/RenameUser?${query}`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus);
}

export function deleteUser(name: string) {
	const query = queryString.stringify({ name });
	return fetch(`/api/Users/DeleteUser?${query}`, {
		credentials: 'same-origin',
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus);
}

export function getUsers() {
	return fetch('/api/Users/GetUsers', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IUser[]>(parseJson);
}

export function getAllUserData() {
	return fetch('/api/Users/GetAllUserData', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IAllUserData[]>(parseJson);
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
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IPeriodScores>(parseJson);
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
			Authorization: authHeader()
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
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}

export function getLifetimeScores() {
	return fetch('/api/Users/GetLifetimeScores', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}
