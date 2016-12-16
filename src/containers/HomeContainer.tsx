import * as React from 'react';
import { browserHistory } from 'react-router';
import Home from '~/pages/Home';
import { IRole, IPeriodScores } from '~/models';
import { getPeriodScores } from '~/api/scores';

interface IHomeContainerState {
	roleId: IRole;
	periodScores: IPeriodScores | null;
}

export default class HomeContainer extends React.PureComponent<void, IHomeContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			roleId: +localStorage.getItem('roleId') as IRole,
			periodScores: null
		};
	}

	componentDidMount() {
		getPeriodScores().then(periodScores => {
			this.setState({ periodScores } as IHomeContainerState);
		});
	}

	handleClickCreateGame = () => {
		browserHistory.push('/game/create');
	}

	handleClickLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('roleId');
		browserHistory.push('/login');
	}

	render() {
		const { roleId, periodScores } = this.state;
		return (
			<Home
				{...{roleId, periodScores}}
				onClickCreateGame={this.handleClickCreateGame}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
