import * as React from 'react';
import AllUserData from '~/components/AllUserData';
import Button from '~/components/Button';
import { IAllUserData } from '~/models';
import * as styles from './ManageUsers.scss';

interface IManageUsersProps {
	users: IAllUserData[];
	roleFilter: string;
	onChangeRoleFilter: (roleFilter: string) => void;
	onClickCreateUser: () => void;
	onClickUser: (user: IAllUserData) => void;
}

export default class ManageUsers extends React.PureComponent<IManageUsersProps> {
	handleChangeRoleFilter = (e: React.FormEvent<HTMLSelectElement>) => {
		const { onChangeRoleFilter } = this.props;
		onChangeRoleFilter(e.currentTarget.value);
	}

	render() {
		const { users, roleFilter, onClickCreateUser, onClickUser } = this.props;
		return (
			<div className={styles.root}>
				<div className={styles.filters}>
					<select
						className={styles.roleFilter}
						value={roleFilter}
						onChange={this.handleChangeRoleFilter}>
						<option>All</option>
						<option>Active</option>
						<option>Observer</option>
						<option>Player</option>
						<option>Admin</option>
					</select>
					<Button
						className={styles.create}
						type='primary'
						display='Create User'
						onClick={onClickCreateUser} />
				</div>
				<div className={styles.table}>
					<div className={styles.header}>
						<div>Name</div>
						<div className={styles.count}>Games Played</div>
						<div className={styles.score}>Lifetime Score</div>
						<div className={styles.when}>Last Game</div>
						<div className={styles.accounts}>Accounts</div>
					</div>
					{users.map((user, i) => (
						<AllUserData key={i} {...{user, onClickUser}} />
					))}
				</div>
			</div>
		);
	}
}
