import * as React from 'react';
import Button from '../components/Button';
import * as styles from './Administration.scss';

interface IAdministrationProps {
	onClickAddUser: () => void;
	onClickUploadGames: () => void;
}

export default class Administration extends React.PureComponent<IAdministrationProps, void> {
	render() {
		const { onClickAddUser, onClickUploadGames } = this.props;
		return(
			<div className={styles.root}>
				<Button className={styles.option} type='primary' display='Create User' onClick={onClickAddUser} />
				<Button className={styles.option} type='primary' display='Upload Games' onClick={onClickUploadGames} />
			</div>
		);
	}
}
