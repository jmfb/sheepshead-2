import * as React from 'react';
import Button from '../components/Button';
import * as styles from './Administration.scss';

interface IAdministrationProps {
	onClickAddUser: () => void;
	onClickUploadGames: () => void;
}

export default class Administration extends React.PureComponent<IAdministrationProps, {}> {
	render() {
		const { onClickAddUser, onClickUploadGames } = this.props;
		return(
			<div className={styles.root}>
				<div className={styles.option}>
					<Button type='primary' display='Create User' onClick={onClickAddUser} />
				</div>
				<div className={styles.option}>
					<Button type='primary' display='Upload Games' onClick={onClickUploadGames} />
				</div>
			</div>
		);
	}
}
