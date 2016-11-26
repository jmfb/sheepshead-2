import { IUser, IMonth, IScore, ICurrentPeriodScores } from '../models';

export function createUser(user: string) : Promise<{}> {
	//TODO: Create user on the server
	return new Promise((resolve, reject) => {
		console.log('Create user', user);
		resolve({});
	});
}

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

export function getMonthScores(month: IMonth) : Promise<IScore[]> {
	//TODO: Get player scores for given month
	return new Promise((resolve, reject) => {
		resolve([
			{ user: 'Jacob Buysse', score: 100 },
			{ user: 'Rebecca Vance', score: 20 },
			{ user: 'Jeff Cutler', score: 10 },
			{ user: 'Austin Binish', score: 0 },
			{ user: 'Mark Centgraf', score: -10 },
			{ user: 'Blake Adams', score: -20 },
			{ user: 'Jon Detert', score: -100 }
		]);
	});
}

export function getYearScores(year: number) : Promise<IScore[]> {
	//TODO: Get player scores for given year
	return new Promise((resolve, reject) => {
		resolve([
			{ user: 'Jacob Buysse', score: 100 },
			{ user: 'Greg Smith', score: 20 },
			{ user: 'Rebecca Vance', score: 20 },
			{ user: 'Jeff Cutler', score: 10 },
			{ user: 'Austin Binish', score: 0 },
			{ user: 'Mark Centgraf', score: -10 },
			{ user: 'Blake Adams', score: -20 },
			{ user: 'Jon Detert', score: -120 }
		]);
	});
}
