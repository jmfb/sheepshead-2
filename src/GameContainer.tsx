import * as React from 'react';
import { hashHistory } from 'react-router';
import ViewGame from './pages/ViewGame';
import { IGame } from './models/game';
import { submitGame, getGame, deleteGame } from './api/games';

interface IGameContainerProps {
	params: { gameId: number };
}

interface IGameContainerState {
	gameId: number;
	game: IGame | null;
	deleted: boolean;
	submitting: boolean;
}

export default class GameContainer extends React.PureComponent<IGameContainerProps, IGameContainerState> {
	constructor(props: IGameContainerProps) {
		super(props);
		this.state = {
			gameId: props.params.gameId,
			game: null,
			deleted: false,
			submitting: false
		};
	}

	componentDidMount() {
		const { gameId } = this.state;
		getGame(gameId).then(game => {
			this.setState({ game } as IGameContainerState);
		});
	}

	componentWillReceiveProps(nextProps: IGameContainerProps) {
		const { gameId } = this.state;
		if (gameId !== nextProps.params.gameId) {
			getGame(nextProps.params.gameId).then(game => {
				this.setState({
					gameId: game.id,
					game,
					deleted: false,
					submitting: false
				});
			});
		}
	}

	handleEdit = () => {
		const { gameId } = this.state;
		hashHistory.push(`/edit/${gameId}`);
	};

	handleDelete = () => {
		const { gameId } = this.state;
		this.setState({ submitting: true } as IGameContainerState);
		deleteGame(gameId).then(() => {
			this.setState({
				deleted: true,
				submitting: false
			} as IGameContainerState);
		});
	};

	handleUndoDelete = () => {
		const { game } = this.state;
		const { when, scores } = game;
		this.setState({ submitting: true } as IGameContainerState);
		submitGame(when, scores).then(gameId => {
			hashHistory.push(`/game/${gameId}`);
		});
	};

	render() {
		const { game, deleted, submitting } = this.state;
		return(
			<ViewGame
				game={game}
				deleted={deleted}
				submitting={submitting}
				onEdit={this.handleEdit}
				onDelete={this.handleDelete}
				onUndoDelete={this.handleUndoDelete} />
		);
	}
}
