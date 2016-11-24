import { IScore, IGame } from '../models/game';

export function submitGame(when: string, scores: IScore[]) : Promise<number> {
	//TODO: submit game to server
	return new Promise((resolve, reject) => {
		console.log('Submitted', when, scores);
		//TODO: get gameId from server response
		resolve(new Date().getMilliseconds());
	});
}

export function updateGame(id: number, when: string, scores: IScore[]) : Promise<{}> {
	//TODO: submit updated game to the server
	return new Promise((resolve, reject) => {
		console.log('Updated', id, when, scores);
		resolve({});
	});
}

export function getGame(id: number) : Promise<IGame> {
	//TODO: get game from server
	return new Promise((resolve, reject) => {
		resolve({
			id,
			when: '2016-11-20',
			scores: [
				{ user: 'Jacob Buysse', score: 10 },
				{ user: 'Rebecca Vance', score: -20 },
				{ user: 'Jeff Cutler', score: 7 },
				{ user: 'Austin Binish', score: 3 },
				{ user: 'Mark Centgraf', score: 0 }
			]
		});
	});
}

export function deleteGame(id: number) : Promise<{}> {
	//TODO: delete game from the server
	return new Promise((resolve, reject) => {
		console.log('Deleted', id);
		resolve({});
	});
}
