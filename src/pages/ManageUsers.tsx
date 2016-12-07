import * as React from 'react';
import AllUserData from '../components/AllUserData';
import Button from '../components/Button';
import { IAllUserData } from '../models';
import * as styles from './ManageUsers.scss';

interface IManageUsersProps {
	users: IAllUserData[];
	onClickCreateUser: () => void;
	onClickUser: (user: IAllUserData) => void;
}

export default class ManageUsers extends React.PureComponent<IManageUsersProps, void> {
	render() {
		const { users, onClickCreateUser, onClickUser } = this.props;
		return (
			<div className={styles.root}>
				<Button type='primary' display='Create User' onClick={onClickCreateUser} />
				<div className={styles.header}>
					<div>Name</div>
					<div>Games Played</div>
					<div>Lifetime Score</div>
					<div className={styles.when}>Last Game</div>
					<div className={styles.accounts}>Accounts</div>
				</div>
				{users.map((user, i) => (
					<AllUserData key={i} {...{user, onClickUser}} />
				))}
			</div>
		);
	}
}
