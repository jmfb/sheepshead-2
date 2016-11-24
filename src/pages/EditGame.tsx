import * as React from 'react';
import DateButton from '../components/DateButton';
import PlayerControl from '../components/PlayerControl';
import { IGame } from '../models/game';
import { IUser, IPlayer } from '../models/user';
import { sum } from 'lodash';
import * as styles from './EditGame.scss';

interface IEditGameProps {
	gameId: number;
	users: IUser[] | null;
	when: string | null;
	players: IPlayer[] | null;
	submitting: boolean;
	onEditWhen: (when: string) => void;
	onSelectUser: (player: IPlayer, user: IUser) => void;
	onChangeScore: (player: IPlayer, value: number) => void;
	onSubmit: () => void;
}

export default class EditGame extends React.PureComponent<IEditGameProps, {}> {
	handleSelectUser = (player: IPlayer) => {
		const { onSelectUser } = this.props;
		return (user: IUser) => onSelectUser(player, user);
	};

	handleChangeScore = (player: IPlayer) => {
		const { onChangeScore } = this.props;
		return (value: number) => onChangeScore(player, value);
	};

	getPointSpread = () => {
		const { players } = this.props;
		const scores = players
			.filter(player => player.score > 0)
			.map(player => player.score);
		return sum(scores);
	};

	getCheckSum = () => {
		const { players } = this.props;
		const scores = players.map(player => player.score);
		return sum(scores);
	};

	render() {
		const { gameId, users, when, players, submitting, onEditWhen, onSubmit } = this.props;
		if (players === null) {
			return(
				<div className={styles.banner}>Loading game data...</div>
			);
		}

		const isValidCheckSum = this.getCheckSum() === 0;
		const canSubmit = !submitting && isValidCheckSum;
		return(
			<div>
				<div className={styles.game}>
					<h1>Game #{gameId}</h1>
					<DateButton
						value={when}
						onChange={onEditWhen} />
				</div>
				{players.map((player, i) => (
					<PlayerControl
						key={i}
						users={users}
						player={player}
						onSelectUser={this.handleSelectUser(player)}
						onChangeScore={this.handleChangeScore(player)} />
				))}
				<div className={styles.pointSpread}>P.S. {this.getPointSpread()}</div>
				{canSubmit &&
					<button className={styles.submit} onClick={onSubmit}>Submit</button>
				}
				{submitting &&
					<div className={styles.submitting}>Submitting...</div>
				}
				{!isValidCheckSum &&
					<div className={styles.error}>Scores do not add up to zero.</div>
				}
			</div>
		);
	}
}
