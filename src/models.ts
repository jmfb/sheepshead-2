export interface IScore {
	user: string;
	score: number;
}

export interface IGame {
	id: number;
	when: string;
	scores: IScore[];
}

export interface IUser {
	name: string;
}

export interface IPlayer {
	user: IUser | null;
	score: number;
	playerNumber: number;
}

export interface IMonth {
	month: string;
	year: number;
}

export type IPeriod = IMonth | number;

export interface IPeriodScore {
	period: IPeriod;
	score: number;
	rank: number;
}

export interface ICurrentPeriodScores {
	user: string;
	monthScore: IPeriodScore;
	yearScore: IPeriodScore;
}
