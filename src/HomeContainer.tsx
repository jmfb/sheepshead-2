import * as React from 'react';
import PlayerControl from './components/PlayerControl';
import { IUser } from './models/user';
import { getUsers } from './api/users';

interface IPlayer {
	user: IUser | null;
	score: number;
}

interface IHomeContainerState {
	users: IUser[] | null;
	players: IPlayer[];
}

export default class HomeContainer extends React.PureComponent<{}, IHomeContainerState> {
	constructor() {
		super();
		this.state = {
			users: null,
			players: [...new Array(6)].map((u, i) => ({ user: null, score: 0 }))
		};
	}

	componentDidMount() {
		getUsers().then(users => { this.setState({ users } as IHomeContainerState); });
	}

	handleSelectUser = (player: IPlayer) => {
		return (user: IUser) => {
			//TODO: save that info: player.user = user; but via setState
		}
	};

	handleChangeScore = (value: number) => {
		console.log('ChangeScore', value);
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
							playerNumber={i + 1}
							score={0}
							onSelectUser={this.handleSelectUser(player)}
							onChangeScore={this.handleChangeScore} />
					))}
				</form>
			</div>
		);
	}
}
