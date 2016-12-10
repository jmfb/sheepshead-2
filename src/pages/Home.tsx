import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import PeriodScores from '~/components/PeriodScores';
import { IRole, playerRoleId, IPeriodScores } from '~/models';
import * as styles from './Home.scss';

interface IHomeProps {
	roleId: IRole;
	periodScores: IPeriodScores | null;
	onClickCreateGame: () => void;
	onClickLogout: () => void;
}

export default class Home extends React.PureComponent<IHomeProps, void> {
	render() {
		const { roleId, periodScores, onClickCreateGame, onClickLogout } = this.props;
		return (
			<div>
				{roleId >= playerRoleId &&
					<Button className={styles.option} type='primary' display='Create Game' onClick={onClickCreateGame} />
				}
				{periodScores === null ?
					<Banner type='message' display='Loading profile...' /> :
					<PeriodScores {...{periodScores}} />
				}
				<Button className={styles.option} type='primary' display='Logout' onClick={onClickLogout} />
			</div>
		);
	}
}
