import * as React from 'react';
import { IAllUserData, roleNames } from '../models';
import * as styles from './AllUserData.scss';
import * as cx from 'classnames';

interface IAllUserDataProps {
	user: IAllUserData;
	onClickUser: (user: IAllUserData) => void;
}

export default class AllUserData extends React.PureComponent<IAllUserDataProps, void> {
	handleClick = () => {
		const { user, onClickUser } = this.props;
		onClickUser(user);
	}

	render() {
		const { user } = this.props;
		const { name, roleId, totalGameCount, lifetimeScore, lastGameWhen, accounts } = user;
		const role = roleNames[roleId].toLowerCase();
		return (
			<div className={styles.root} onClick={this.handleClick}>
				<div className={cx(styles.name, styles[role])}>{name}</div>
				<div className={styles.games}>{totalGameCount}</div>
				<div className={cx(styles.score, { [styles.negative]: lifetimeScore < 0 })}>{lifetimeScore}</div>
				<div className={styles.when}>{lastGameWhen || 'Never'}</div>
				<div className={styles.accounts}>{accounts.join('\n')}</div>
			</div>
		);
	}
}
