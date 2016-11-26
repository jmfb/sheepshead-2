import * as React from 'react';
import DateButton from '../components/DateButton';
import PlayerControl from '../components/PlayerControl';
import Button from '../components/Button';
import PointSpread from '../components/PointSpread';
import Banner from '../components/Banner';
import { IGame, IUser, IPlayer } from '../models';
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

	getCheckSum = () => {
		const { players } = this.props;
		const scores = players.map(player => player.score);
		return sum(scores);
	};

	render() {
		const { gameId, users, when, players, submitting, onEditWhen, onSubmit } = this.props;
		if (players === null) {
			return(
				<Banner type='message' display='Loading game data...' />
			);
		}

		const isValidCheckSum = this.getCheckSum() === 0;
		const canSubmit = !submitting && isValidCheckSum;
		return(
			<div className={styles.root}>
				<div className={styles.game}>
					<h1 className={styles.title}>Game #{gameId}</h1>
					<DateButton
						value={when}
						onChange={onEditWhen} />
				</div>
				{players.map((player, i) => (
					<PlayerControl
						key={i}
						{...{users, player}}
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
					<Banner type='message' display='Submitting...' />
				}
				{!isValidCheckSum &&
					<Banner type='error' display='Scores do not add up to zero.' />
				}
			</div>
		);
	}
}
