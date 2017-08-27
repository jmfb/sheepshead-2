import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { History } from 'history';
import SubmitGame from '~/pages/SubmitGame';
import { IUser, IPlayer, playerRoleId } from '~/models';
import { getUsers } from '~/api/users';
import { updateGame } from '~/api/games';
import * as moment from 'moment';

interface ICreateGameContainerProps {
	history: History;
}

interface ICreateGameContainerState {
	users: IUser[] | null;
	players: IPlayer[];
	submitting: boolean;
	isAuthenticated: boolean;
}

class CreateGameContainer extends React.PureComponent<ICreateGameContainerProps, ICreateGameContainerState> {
	constructor(props: ICreateGameContainerProps) {
		super(props);
		this.state = {
			users: null,
			players: [...new Array(6)].map((_, i) => ({
				user: null,
				score: 0,
				playerNumber: i + 1
			})),
			submitting: false,
			isAuthenticated: +localStorage.getItem('roleId') >= playerRoleId
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
		const { history } = this.props;
		const { players } = this.state;
		const scores = players
			.filter(player => player.user !== null)
			.map(player => ({ user: player.user.name, score: player.score }));
		const when = moment().format('YYYY-MM-DD');
		this.setState({ submitting: true } as ICreateGameContainerState);
		updateGame(0, when, scores).then(gameId => {
			history.push(`/game/view/${gameId}`);
		});
	}

	render() {
		const { users, players, submitting, isAuthenticated } = this.state;
		if (!isAuthenticated) {
			return (
				<Redirect to='/login' />
			);
		}
		return (
			<SubmitGame
				{...{users, players, submitting}}
				onSelectUser={this.handleSelectUser}
				onChangeScore={this.handleChangeScore}
				onSubmit={this.handleSubmit}
				/>
		);
	}
}

export default withRouter(CreateGameContainer);
