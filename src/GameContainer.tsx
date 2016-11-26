import * as React from 'react';
import { hashHistory } from 'react-router';
import ViewGame from './pages/ViewGame';
import { IGame } from './models';
import { updateGame, getGame, deleteGame } from './api/games';

interface IGameContainerProps {
	params: { gameId: string };
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
			gameId: +props.params.gameId,
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
		const nextGameId = +nextProps.params.gameId;
		if (gameId !== nextGameId) {
			this.setState({
				gameId: nextGameId,
				game: null,
				deleted: false,
				submitting: false
			});
			getGame(nextGameId).then(game => {
				this.setState({ game } as IGameContainerState);
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
		const { id, when, scores } = game;
		this.setState({ submitting: true } as IGameContainerState);
		updateGame(id, when, scores).then(() => {
			this.setState({
				deleted: false,
				submitting: false
			} as IGameContainerState);
		});
	};

	render() {
		const { game, deleted, submitting } = this.state;
		return(
			<ViewGame
				{...{game, deleted, submitting}}
				onEdit={this.handleEdit}
				onDelete={this.handleDelete}
				onUndoDelete={this.handleUndoDelete} />
		);
	}
}
