import { IUser, ICurrentPeriodScores } from '../models';

export function getUsers() : Promise<IUser[]> {
	//TODO: Retrieve user list from the server
	return new Promise((resolve, reject) => {
		resolve([
			{ name: 'Jacob Buysse' },
			{ name: 'Jeff Cutler' },
			{ name: 'Rebecca Vance' },
			{ name: 'Austin Binish' },
			{ name: 'Mark Centgraf' },
			{ name: 'Blake Adams' },
			{ name: 'Jon Detert' },
			{ name: 'Penny Laferriere' }
		]);
	});
}

export function getCurrentPeriodScores() : Promise<ICurrentPeriodScores> {
	//TODO: Get current user period scores from the server
	return new Promise((resolve, reject) => {
		resolve({
			user: 'Jacob Buysse',
			monthScore: {
				period: { month: 'November', year: 2016 },
				score: 20,
				rank: 2
			},
			yearScore: {
				period: 2016,
				score: 124,
				rank: 4
			}
		});
	});
}
