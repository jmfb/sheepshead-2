export interface ILoginModel {
	token: string;
	roleId: number;
}

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

export const roleNames = ['Observer', 'Player', 'Admin'];
export const observerRoleId = 0;
export const playerRoleId = 1;
export const adminRoleId = 2;
export type IRole = 0 | 1 | 2;

export interface IUser {
	name: string;
	roleId: IRole;
}

export interface IAllUserData {
	name: string;
	roleId: IRole;
	totalGameCount: number;
	lifetimeScore: number;
	lastGameWhen: string | null;
	accounts: string[];
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
