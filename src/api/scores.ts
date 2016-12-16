import { IMonth, IScore, IPeriodScores, IGameScore } from '~/models';
import { checkStatus, parseJson, authHeader } from './helpers';
import * as queryString from 'query-string';
import * as moment from 'moment';

export function getScores(account: string, startDate: moment.Moment, endDateExclusive: moment.Moment) {
	const query = queryString.stringify({
		account,
		startDate: startDate.format('yyyy-MM-dd'),
		endDateExclusive: endDateExclusive.format('yyyy-MM-dd')
	});
	return fetch(`/api/Scores/GetScores?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IGameScore[]>(parseJson);
}

export function getPeriodScores() {
	const now = moment();
	const query = queryString.stringify({
		month: now.format('MMMM'),
		year: now.year()
	});
	return fetch(`/api/Scores/GetPeriodScores?${query}`, {
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
	return fetch(`/api/Scores/GetMonthScores?${query}`, {
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
	return fetch(`/api/Scores/GetYearScores?${query}`, {
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
	return fetch('/api/Scores/GetLifetimeScores', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IScore[]>(parseJson);
}
