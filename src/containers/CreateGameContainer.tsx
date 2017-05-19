import * as React from 'react';
import { browserHistory } from 'react-router';
import SubmitGame from '~/pages/SubmitGame';
import { IUser, IPlayer, playerRoleId } from '~/models';
import { getUsers } from '~/api/users';
import { updateGame } from '~/api/games';
import * as moment from 'moment';

interface ICreateGameContainerState {
	users: IUser[] | null;
	players: IPlayer[];
	submitting: boolean;
}

export default class CreateGameContainer extends React.PureComponent<void, ICreateGameContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			users: null,
			players: [...new Array(6)].map((_, i) => ({
				user: null,
				score: 0,
				playerNumber: i + 1
			})),
			submitting: false
		};
	}

	componentDidMount() {
		getUsers().then(users => {
			const activeUsers = users.filter(user => user.roleId >= playerRoleId);
			this.setState({ users: activeUsers } as ICreateGameContainerState);
		});
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
		newUsers.splice(userIndex, 1);
		if (player.user !== null) {
			newUsers.push(player.user);
		}

		const selectedCount = newPlayers.filter(p => p.user != null).length;
		if (selectedCount === newPlayers.length) {
			newPlayers.push({
				user: null,
				score: 0,
				playerNumber: selectedCount + 1
			});
		}

		this.setState({
			users: newUsers,
			players: newPlayers
		} as ICreateGameContainerState);
	}

	handleChangeScore = (player: IPlayer, value: number) => {
		const { players } = this.state;
		const index = players.indexOf(player);
		const newPlayers = [...players];
		newPlayers[index] = {
			user: player.user,
			score: player.score + value,
			playerNumber: player.playerNumber
		};
		this.setState({ players: newPlayers } as ICreateGameContainerState);
	}

	handleSubmit = () => {
		const { players } = this.state;
		const scores = players
			.filter(player => player.user !== null)
			.map(player => ({ user: player.user.name, score: player.score }));
		const when = moment().format('YYYY-MM-DD');
		this.setState({ submitting: true } as ICreateGameContainerState);
		updateGame(0, when, scores).then(gameId => {
			browserHistory.push(`/game/view/${gameId}`);
		});
	}

	render() {
		const { users, players, submitting } = this.state;
		return (
			<SubmitGame
				{...{users, players, submitting}}
				onSelectUser={this.handleSelectUser}
				onChangeScore={this.handleChangeScore}
				onSubmit={this.handleSubmit} />
		);
	}
}
