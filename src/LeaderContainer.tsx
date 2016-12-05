import * as React from 'react';
import { browserHistory } from 'react-router';
import ScoreView from './pages/ScoreView';
import Banner from './components/Banner';
import { ICurrentPeriodScores, IMonth } from './models';
import { getPeriodScores } from './api/users';

interface ILeaderContainerState {
	currentScores: ICurrentPeriodScores | null;
}

export default class LeaderContainer extends React.PureComponent<void, ILeaderContainerState> {
	constructor(props: any) {
		super(props);
		this.state = { currentScores: null };
	}

	componentDidMount() {
		getPeriodScores().then(currentScores => {
			this.setState({ currentScores });
		});
	}

	handleClickMonth = () => {
		const { currentScores } = this.state;
		const { monthScore } = currentScores;
		const month = monthScore.period as IMonth;
		browserHistory.push(`/leader/${month.year}/${month.month}`);
	}

	handleClickYear = () => {
		const { currentScores } = this.state;
		const { yearScore } = currentScores;
		const year = yearScore.period as number;
		browserHistory.push(`/leader/${year}`);
	}

	render() {
		const { currentScores } = this.state;
		if (currentScores === null) {
			return(
				<Banner type='message' display='Loading scores...' />
			);
		}
		const { user, monthScore, yearScore } = currentScores;
		const { children } = this.props;
		return(
			<ScoreView
				{...{user, monthScore, yearScore, children}}
				onClickMonth={this.handleClickMonth}
				onClickYear={this.handleClickYear} />
		);
	}
}
