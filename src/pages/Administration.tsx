import * as React from 'react';
import Button from '~/components/Button';
import * as styles from './Administration.scss';

interface IAdministrationProps {
	onClickManageUsers: () => void;
	onClickUploadGames: () => void;
}

export default class Administration extends React.PureComponent<IAdministrationProps, void> {
	render() {
		const { onClickManageUsers, onClickUploadGames } = this.props;
		return(
			<div>
				<Button className={styles.option} type='primary' display='Manage Users' onClick={onClickManageUsers} />
				<Button className={styles.option} type='primary' display='Upload Games' onClick={onClickUploadGames} />
			</div>
		);
	}
}
