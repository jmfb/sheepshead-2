export interface IScore {
	user: string;
	score: number;
}

export interface IGame {
	id: number;
	when: string;
	scores: IScore[];
}
