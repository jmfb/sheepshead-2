import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import ViewGame from '~/pages/ViewGame';
import { IGame, IRole } from '~/models';
import { updateGame, getGame, deleteGame } from '~/api/games';
import { IState } from '~/reducers';

interface IGameContainerOwnProps {
	match: match<{ gameId: string }>;
	history: History;
}

interface IGameContainerStateProps {
	roleId: IRole;
}

type IGameContainerProps = IGameContainerOwnProps & IGameContainerStateProps;

function mapStateToProps(state: IState): IGameContainerStateProps {
	return {
		roleId: state.currentUser.roleId
	};
}

interface IGameContainerState {
	gameId: number;
	game: IGame | null;
	deleted: boolean;
	submitting: boolean;
}

class GameContainer extends React.PureComponent<IGameContainerProps, IGameContainerState> {
	constructor(props: IGameContainerProps) {
		super(props);
		this.state = {
			gameId: +props.match.params.gameId,
			game: null,
			deleted: false,
			submitting: false
		};
	}

	componentDidMount() {
		const { gameId } = this.state;
		getGame(gameId).then(game => {
			this.setState({ game });
		});
	}

	componentWillReceiveProps(nextProps: IGameContainerProps) {
		const { gameId } = this.state;
		const nextGameId = +nextProps.match.params.gameId;
		if (gameId !== nextGameId) {
			this.setState({
				gameId: nextGameId,
				game: null,
				deleted: false,
				submitting: false
			} as IGameContainerState);
			getGame(nextGameId).then(game => {
				this.setState({ game });
			});
		}
	}

	handleEdit = () => {
		const { history } = this.props;
		const { gameId } = this.state;
		history.push(`/game/edit/${gameId}`);
	}

	handleDelete = () => {
		const { gameId } = this.state;
		this.setState({ submitting: true });
		deleteGame(gameId).then(() => {
			this.setState({
				deleted: true,
				submitting: false
			});
		});
	}

	handleUndoDelete = () => {
		const { game } = this.state;
		const { id, when, scores } = game;
		this.setState({ submitting: true });
		updateGame(id, when, scores).then(() => {
			this.setState({
				deleted: false,
				submitting: false
			});
		});
	}

	render() {
		const { roleId } = this.props;
		const { game, deleted, submitting } = this.state;
		return (
			<ViewGame
				{...{roleId, game, deleted, submitting}}
				onEdit={this.handleEdit}
				onDelete={this.handleDelete}
				onUndoDelete={this.handleUndoDelete}
				/>
		);
	}
}

export default connect(mapStateToProps)(withRouter(GameContainer));
