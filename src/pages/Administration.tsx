import * as React from 'react';
import Button from '../components/Button';
import * as styles from './Administration.scss';

interface IAdministrationProps {
	onClickManageUsers: () => void;
	onClickUploadGames: () => void;
	onClickLogout: () => void;
}

export default class Administration extends React.PureComponent<IAdministrationProps, void> {
	render() {
		const { onClickManageUsers, onClickUploadGames, onClickLogout } = this.props;
		return(
			<div className={styles.root}>
				<Button className={styles.option} type='primary' display='Manags Users' onClick={onClickManageUsers} />
				<Button className={styles.option} type='primary' display='Upload Games' onClick={onClickUploadGames} />
				<Button className={styles.option} type='primary' display='Logout' onClick={onClickLogout} />
			</div>
		);
	}
}
