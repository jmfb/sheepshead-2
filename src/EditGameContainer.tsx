import * as React from 'react';
import EditGame from './pages/EditGame';
import { getUsers } from './api/users';
import { getGame } from './api/games';
import { IUser } from './models/user';
import { IGame } from './models/game';
import * as moment from 'moment';

interface IEditGameContainerProps {
	params: { gameId: string };
}

interface IEditGameContainerState {
	gameId: number;
	users: IUser[] | null;
	game: IGame | null;
	when: string | null;
}

export default class EditGameContainer extends React.PureComponent<IEditGameContainerProps, IEditGameContainerState> {
	constructor(props: IEditGameContainerProps) {
		super(props);
		this.state = {
			gameId: +props.params.gameId,
			users: null,
			game: null,
			when: null
		};
	}

	componentDidMount() {
		getUsers().then(users => {
			this.setState({ users } as IEditGameContainerState);
		});
		const { gameId } = this.state;
		getGame(gameId).then(game => {
			this.setState({
				game,
				when: game.when
			} as IEditGameContainerState);
		});
	}

	handleEditWhen = (when: string) => {
		this.setState({ when } as IEditGameContainerState);
	};

	render() {
		const { game, when } = this.state;
		return(
			<EditGame
				gameId={game === null ? null : game.id}
				when={when}
				onEditWhen={this.handleEditWhen} />
		);
	}
}
