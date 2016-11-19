import * as React from 'react';
import PlayerControl from './components/PlayerControl';
import { IUser, IPlayer } from './models/user';
import { getUsers } from './api/users';

interface IHomeContainerState {
	users: IUser[] | null;
	players: IPlayer[];
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
			}))
		};
	}

	componentDidMount() {
		getUsers().then(users => { this.setState({ users } as IHomeContainerState); });
	}

	handleSelectUser = (player: IPlayer) => {
		return (user: IUser) => {
			const { players } = this.state;
			const index = players.indexOf(player);
			const newPlayers = [...players];
			newPlayers[index] = {
				user,
				score: player.score,
				playerNumber: player.playerNumber
			};
			this.setState({ players: newPlayers } as IHomeContainerState);
		};
	};

	handleChangeScore = (player: IPlayer) => {
		return (value: number) => {
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
	};

	render() {
		const { users, players } = this.state;
		return(
			<div>
				<form>
					{players.map((player, i) => (
						<PlayerControl
							key={i}
							users={users}
							player={player}
							onSelectUser={this.handleSelectUser(player)}
							onChangeScore={this.handleChangeScore(player)} />
					))}
				</form>
			</div>
		);
	}
}
