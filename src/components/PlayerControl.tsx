import * as React from 'react';
import UserSelect from './UserSelect';
import ScorePicker from './ScorePicker';
import { IUser, IPlayer } from '~/models';
import * as styles from './PlayerControl.scss';

interface IPlayerControlProps {
	users: IUser[];
	player: IPlayer;
	onSelectUser: (user: IUser) => void;
	onChangeScore: (value: number) => void;
}

export default class PlayerControl extends React.PureComponent<IPlayerControlProps, void> {
	render() {
		const { users, player, onSelectUser, onChangeScore } = this.props;
		return(
			<div className={styles.root}>
				<UserSelect
					className={styles.user}
					users={users}
					user={player.user}
					placeholder={`Player ${player.playerNumber}`}
					onSelect={onSelectUser} />
				<ScorePicker
					className={styles.score}
					value={player.score}
					onChange={onChangeScore} />
			</div>
		);
	}
}
