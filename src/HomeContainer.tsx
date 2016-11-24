import * as React from 'react';
import { hashHistory } from 'react-router';
import SubmitGame from './pages/SubmitGame';
import { IUser, IPlayer } from './models/user';
import { getUsers } from './api/users';
import { submitGame } from './api/games';

interface IHomeContainerState {
	users: IUser[] | null;
	players: IPlayer[];
	submitting: boolean;
}

export default class HomeContainer extends React.PureComponent<{}, IHomeContainerState> {
	constructor() {
		super();
		this.state = {
			users: null,
			players: [...new Array(6)].map((u, i) => ({
				user: null,
				score: 0,
				playerNumber: i + 1
			})),
			submitting: false
		};
	}

	componentDidMount() {
		getUsers().then(users => { this.setState({ users } as IHomeContainerState); });
	}

	handleSelectUser = (player: IPlayer, user: IUser) => {
		const { users, players } = this.state;
		const index = players.indexOf(player);
		const newPlayers = [...players];
		newPlayers[index] = {
			user,
			score: player.score,
			playerNumber: player.playerNumber
		};

		const userIndex = users.indexOf(user);
		const newUsers = [...users];
		newUsers.splice(userIndex, 1)
		if (player.user !== null)
			newUsers.push(player.user);

		this.setState({
			users: newUsers,
			players: newPlayers
		} as IHomeContainerState);
	};

	handleChangeScore = (player: IPlayer, value: number) => {
		const { players } = this.state;
		const index = players.indexOf(player);
		const newPlayers = [...players];
		newPlayers[index] = {
			user: player.user,
			score: player.score + value,
			playerNumber: player.playerNumber
		};
		this.setState({ players: newPlayers } as IHomeContainerState);
	};

	handleSubmit = () => {
		const { players } = this.state;
		const scores = players
			.filter(player => player.user !== null)
			.map(player => ({ user: player.user.name, score: player.score }));
		const when = new Date().toISOString().substr(0, 10);
		this.setState({ submitting: true } as IHomeContainerState);
		submitGame(when, scores).then(gameId => {
			hashHistory.push(`/game/${gameId}`);
		});
	};

	render() {
		const { users, players, submitting } = this.state;
		return(
			<SubmitGame
				{...{users, players, submitting}}
				onSelectUser={this.handleSelectUser}
				onChangeScore={this.handleChangeScore}
				onSubmit={this.handleSubmit} />
		);
	}
}
