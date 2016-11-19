import { IScore } from '../models/game';

export function submitGame(scores: IScore[]) : Promise<number> {
	//TODO: submit game to server
	return new Promise((resolve, reject) => {
		console.log(scores);
		const gameId = 1; //TODO: get gameId from server response
		resolve(gameId);
	});
}
