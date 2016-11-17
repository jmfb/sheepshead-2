import { IUser } from '../models/user';

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
