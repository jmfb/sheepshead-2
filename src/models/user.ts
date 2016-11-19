export interface IUser {
	name: string;
}

export interface IPlayer {
	user: IUser | null;
	score: number;
	playerNumber: number;
}
