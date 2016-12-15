import * as React from 'react';
import ScoreView from '~/pages/ScoreView';
import { IMonth, IGame, IScore } from '~/models';
import { getGames } from '~/api/games';
import { getMonthScores, getYearScores } from '~/api/users';
import * as moment from 'moment';

interface IDefaultLeaderContainerState {
	month: IMonth;
	game: IGame | null;
	monthScores: IScore[] | null;
	yearScores: IScore[] | null;
}

export default class DefaultLeaderContainer extends React.PureComponent<void, IDefaultLeaderContainerState> {
	constructor(props: void) {
		super(props);
		const now = moment();
		this.state = {
			month: { year: now.year(), month: now.format('MMMM') },
			game: null,
			monthScores: null,
			yearScores: null
		};
	}

	componentDidMount() {
		const { month } = this.state;
		getGames(0, 1).then(games => {
			this.setState({ game: games.games[0] } as IDefaultLeaderContainerState);
		});
		getMonthScores(month).then(scores => {
			this.setState({ monthScores: scores } as IDefaultLeaderContainerState);
		});
		getYearScores(month.year).then(scores => {
			this.setState({ yearScores: scores } as IDefaultLeaderContainerState);
		});
	}

	render() {
		const { month, game, monthScores, yearScores } = this.state;
		return (
			<ScoreView {...{month, game, monthScores, yearScores}} />
		);
	}
}
