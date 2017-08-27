import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import Home from '~/pages/Home';
import { IRole, IPeriodScores } from '~/models';
import { getPeriodScores } from '~/api/scores';

interface IHomeContainerProps {
	history: History;
}

interface IHomeContainerState {
	roleId: IRole;
	periodScores: IPeriodScores | null;
}

class HomeContainer extends React.PureComponent<IHomeContainerProps, IHomeContainerState> {
	constructor(props: IHomeContainerProps) {
		super(props);
		this.state = {
			roleId: +localStorage.getItem('roleId') as IRole,
			periodScores: null
		};
	}

	componentDidMount() {
		getPeriodScores().then(periodScores => {
			this.setState({ periodScores });
		});
	}

	handleClickCreateGame = () => {
		const { history } = this.props;
		history.push('/game/create');
	}

	handleClickLogout = () => {
		const { history } = this.props;
		localStorage.removeItem('token');
		localStorage.removeItem('roleId');
		history.push('/login');
	}

	render() {
		const { roleId, periodScores } = this.state;
		return (
			<Home
				{...{roleId, periodScores}}
				onClickCreateGame={this.handleClickCreateGame}
				onClickLogout={this.handleClickLogout}
				/>
		);
	}
}

export default withRouter(HomeContainer);
