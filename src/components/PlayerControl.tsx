import * as React from 'react';
import UserSelect from './UserSelect';
import ScorePicker from './ScorePicker';
import { IUser } from '../models/user';

interface IPlayerControlProps {
	users: IUser[];
	playerNumber: number;
	score: number;
	onSelectUser: (user: IUser) => void;
	onChangeScore: (value: number) => void;
}

export default class PlayerControl extends React.PureComponent<IPlayerControlProps, {}> {
	render() {
		const { users, playerNumber, score, onSelectUser, onChangeScore } = this.props;
		return(
			<div>
				<UserSelect users={users} onSelect={onSelectUser} placeholder={`Player ${playerNumber}`} />
				<ScorePicker value={score} onChange={onChangeScore} />
			</div>
		);
	}
}
