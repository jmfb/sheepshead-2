import * as React from 'react';
import Banner from '~/components/Banner';
import Leaderboard from '~/components/Leaderboard';
import PointSpread from '~/components/PointSpread';
import { IScore } from '~/models';
import * as styles from './LifetimeView.scss';

interface ILifetimeViewProps {
	scores: IScore[] | null;
}

export default class LifetimeView extends React.PureComponent<ILifetimeViewProps> {
	render() {
		const { scores } = this.props;
		return (
			<div className={styles.root}>
				<h1>Lifetime Scores</h1>
				{scores === null ?
					<Banner type='message' display='Loading scores...' /> :
					<Leaderboard scores={scores} />
				}
				{scores !== null &&
					<PointSpread scores={scores} />
				}
			</div>
		);
	}
}
