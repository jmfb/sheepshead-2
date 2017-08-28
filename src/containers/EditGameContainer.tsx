import * as React from 'react';
import { Redirect, withRouter, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import EditGame from '~/pages/EditGame';
import { IUser, IPlayer, playerRoleId } from '~/models';
import { getUsers } from '~/api/users';
import { getGame, updateGame } from '~/api/games';
import { IState } from '~/reducers';

interface IEditGameContainerOwnProps {
	match: match<{ gameId: string }>;
	history: History;
}

interface IEditGameContainerStateProps {
	isAuthenticated: boolean;
}

type IEditGameContainerProps = IEditGameContainerOwnProps & IEditGameContainerStateProps;

function mapStateToProps(state: IState): IEditGameContainerStateProps {
	return {
		isAuthenticated: state.currentUser.roleId >= playerRoleId
	};
}

interface IEditGameContainerState {
	gameId: number;
	users: IUser[] | null;
	when: string | null;
	players: IPlayer[] | null;
	submitting: boolean;
}

class EditGameContainer extends React.PureComponent<IEditGameContainerProps, IEditGameContainerState> {
	constructor(props: IEditGameContainerProps) {
		super(props);
		this.state = {
			gameId: +props.match.params.gameId,
			users: null,
			when: null,
			players: null,
			submitting: false
		};
	}

	componentDidMount() {
		getUsers().then(users => {
			const { gameId } = this.state;
			getGame(gameId).then(game => {
				const players = game.scores.map((score, i) => ({
					user: users.splice(users.findIndex(user => user.name === score.user), 1)[0],
					score: score.score,
					playerNumber: i + 1
				}));
				this.setState({
					users,
					when: game.when,
					players
				} as IEditGameContainerState);
			});
		});
	}

	handleEditWhen = (when: string) => {
		this.setState({ when } as IEditGameContainerState);
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

		this.setState({
			users: newUsers,
			players: newPlayers
		} as IEditGameContainerState);
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
		this.setState({ players: newPlayers } as IEditGameContainerState);
	}

	handleSubmit = () => {
		const { history } = this.props;
		const { gameId, when, players } = this.state;
		const scores = players
			.map(player => ({ user: player.user.name, score: player.score }));
		this.setState({ submitting: true } as IEditGameContainerState);
		updateGame(gameId, when, scores).then(() => {
			history.push(`/game/view/${gameId}`);
		});
	}

	render() {
		const { isAuthenticated } = this.props;
		const { gameId, users, when, players, submitting } = this.state;
		if (!isAuthenticated) {
			return (
				<Redirect to='/login' />
			);
		}
		return (
			<EditGame
				{...{gameId, users, when, players, submitting}}
				onEditWhen={this.handleEditWhen}
				onSelectUser={this.handleSelectUser}
				onChangeScore={this.handleChangeScore}
				onSubmit={this.handleSubmit}
				/>
		);
	}
}

export default connect(mapStateToProps)(withRouter(EditGameContainer));
