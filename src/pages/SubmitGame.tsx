import * as React from 'react';
import PlayerControl from '~/components/PlayerControl';
import PointSpread from '~/components/PointSpread';
import Banner from '~/components/Banner';
import Button from '~/components/Button';
import { IUser, IPlayer } from '~/models';
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

export default class SubmitGame extends React.PureComponent<ISubmitGameProps> {
	handleSelectUser = (player: IPlayer) => {
		const { onSelectUser } = this.props;
		return (user: IUser) => onSelectUser(player, user);
	}

	handleChangeScore = (player: IPlayer) => {
		const { onChangeScore } = this.props;
		return (value: number) => onChangeScore(player, value);
	}

	getCheckSum = () => {
		const { players } = this.props;
		const scores = players.map(player => player.score);
		return sum(scores);
	}

	arePlayerSelectionsValid = () => {
		const { players } = this.props;
		return players.every((player, i) => {
			return i < 5 ?
				player.user !== null :
				player.user !== null || player.score === 0;
		});
	}

	render() {
		const { users, players, submitting, onSubmit } = this.props;
		const isValidCheckSum = this.getCheckSum() === 0;
		const arePlayerSelectionsValid = this.arePlayerSelectionsValid();
		const canSubmit = !submitting && isValidCheckSum && arePlayerSelectionsValid;
		return(
			<div className={styles.root}>
				{players.map((player, i) => (
					<PlayerControl
						key={i}
						{...{users, player}}
						onSelectUser={this.handleSelectUser(player)}
						onChangeScore={this.handleChangeScore(player)} />
				))}
				<PointSpread scores={players} />
				{canSubmit &&
					<Button className={styles.submit} display='Submit' type='primary' onClick={onSubmit} />
				}
				{submitting &&
					<Banner type='message' display='Submitting...' />
				}
				{!isValidCheckSum &&
					<Banner type='error' display='Scores do not add up to zero.' />
				}
				{!arePlayerSelectionsValid &&
					<Banner type='error' display='Finish selecting players to submit.' />
				}
			</div>
		);
	}
}
