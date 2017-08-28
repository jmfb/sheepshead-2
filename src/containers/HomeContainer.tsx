import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import Home from '~/pages/Home';
import { IRole, IPeriodScores } from '~/models';
import { getPeriodScores } from '~/api/scores';
import { setCurrentUser } from '~/actions';
import { IState } from '~/reducers';

interface IHomeContainerOwnProps {
	history: History;
}

interface IHomeContainerStateProps {
	roleId: IRole;
}

interface IHomeContainerDispatchProps {
	setCurrentUser: (roleId: IRole | null, token: string | null) => void;
}

type IHomeContainerProps =
	IHomeContainerOwnProps &
	IHomeContainerStateProps &
	IHomeContainerDispatchProps;

function mapStateToProps(state: IState): IHomeContainerStateProps {
	return {
		roleId: state.currentUser.roleId
	};
}

const mapDispatchToProps: IHomeContainerDispatchProps = {
	setCurrentUser
};

interface IHomeContainerState {
	periodScores: IPeriodScores | null;
}

class HomeContainer extends React.PureComponent<IHomeContainerProps, IHomeContainerState> {
	constructor(props: IHomeContainerProps) {
		super(props);
		this.state = {
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
		const { history, setCurrentUser } = this.props;
		setCurrentUser(null, null);
		history.push('/login');
	}

	render() {
		const { roleId } = this.props;
		const { periodScores } = this.state;
		return (
			<Home
				{...{roleId, periodScores}}
				onClickCreateGame={this.handleClickCreateGame}
				onClickLogout={this.handleClickLogout}
				/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));
