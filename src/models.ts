export interface IScore {
	user: string;
	score: number;
}

export interface IGame {
	id: number;
	when: string;
	scores: IScore[];
}

export interface IGames {
	games: IGame[];
	moreGames: boolean;
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

export interface IGameReport {
	reports: {
		gameId: number;
		playerScores: {
			name: string;
			score: number;
		}[];
		pointSpread: number;
		title: string;
	}[];
}

export interface IToken {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	id_token: string;
}

export interface IRefreshToken {
	access_token: string;
	token_type: string;
	expires_in: number;
	id_token: string;
}

export interface IUserInfo {
	family_name: string;
	name: string;
	picture: string;
	gender: string;
	email: string;
	link: string;
	given_name: string;
	id: string;
	verified_email: boolean;
}
