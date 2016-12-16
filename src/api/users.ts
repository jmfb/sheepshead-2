import { IUser, IAllUserData } from '~/models';
import { checkStatus, parseJson, authHeader } from './helpers';
import * as queryString from 'query-string';

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
