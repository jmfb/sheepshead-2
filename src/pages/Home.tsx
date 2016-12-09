import * as React from 'react';
import Button from '../components/Button';
import { IRole, playerRoleId } from '../models';
import * as styles from './Home.scss';

interface IHomeProps {
	roleId: IRole;
	onClickCreateGame: () => void;
	onClickLogout: () => void;
}

export default class Home extends React.PureComponent<IHomeProps, void> {
	render() {
		const { roleId, onClickCreateGame, onClickLogout } = this.props;
		return (
			<div>
				{roleId >= playerRoleId &&
					<Button className={styles.option} type='primary' display='Create Game' onClick={onClickCreateGame} />
				}
				<Button className={styles.option} type='primary' display='Logout' onClick={onClickLogout} />
			</div>
		);
	}
}
