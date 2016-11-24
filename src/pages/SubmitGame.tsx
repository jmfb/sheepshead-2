import * as React from 'react';
import { IUser, IPlayer } from '../models/user';
import PlayerControl from '../components/PlayerControl';
import PointSpread from '../components/PointSpread';
import Button from '../components/Button';
import { sum } from 'lodash';
import * as styles from './SubmitGame.scss';

interface ISubmitGameProps {
	users: IUser[] | null;
	players: IPlayer[];
	submitting: boolean;
	onSelectUser: (player: IPlayer, user: IUser) => void;
	onChangeScore: (player: IPlayer, value: number) => void;
	onSubmit: () => void;
}

export default class SubmitGame extends React.PureComponent<ISubmitGameProps, {}> {
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

	arePlayerSelectionsValid = () => {
		const { players } = this.props;
		return players.every((player, i) => {
			return i < 5 ?
				player.user !== null :
				player.user !== null || player.score === 0;
		});
	};

	render() {
		const { users, players, submitting, onSubmit } = this.props;
		const isValidCheckSum = this.getCheckSum() === 0;
		const arePlayerSelectionsValid = this.arePlayerSelectionsValid();
		const canSubmit = !submitting && isValidCheckSum && arePlayerSelectionsValid;
		return(
			<div className={styles.root}>
				<form>
					{players.map((player, i) => (
						<PlayerControl
							key={i}
							users={users}
							player={player}
							onSelectUser={this.handleSelectUser(player)}
							onChangeScore={this.handleChangeScore(player)} />
					))}
					<PointSpread scores={players} />
					{canSubmit &&
						<div className={styles.submit}>
							<Button display='Submit' type='primary' onClick={onSubmit} />
						</div>
					}
					{submitting &&
						<div className={styles.submitting}>Submitting...</div>
					}
					{!isValidCheckSum &&
						<div className={styles.error}>Scores do not add up to zero.</div>
					}
					{!arePlayerSelectionsValid &&
						<div className={styles.error}>Finish selecting players to submit.</div>
					}
				</form>
			</div>
		);
	}
}
