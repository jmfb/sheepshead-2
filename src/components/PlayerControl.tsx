import * as React from 'react';
import UserSelect from './UserSelect';
import ScorePicker from './ScorePicker';
import { IUser, IPlayer } from '../models/user';

interface IPlayerControlProps {
	users: IUser[];
	player: IPlayer;
	onSelectUser: (user: IUser) => void;
	onChangeScore: (value: number) => void;
}

export default class PlayerControl extends React.PureComponent<IPlayerControlProps, {}> {
	render() {
		const { users, player, onSelectUser, onChangeScore } = this.props;
		return(
			<div>
				<UserSelect
					users={users}
					user={player.user}
					placeholder={`Player ${player.playerNumber}`}
					onSelect={onSelectUser} />
				<ScorePicker value={player.score} onChange={onChangeScore} />
			</div>
		);
	}
}
