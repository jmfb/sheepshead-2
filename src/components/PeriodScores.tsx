import * as React from 'react';
import PeriodScore from './PeriodScore';
import { IPeriodScores } from '~/models';
import * as styles from './PeriodScores.scss';

interface IPeriodScoresProps {
	periodScores: IPeriodScores;
}

export default class PeriodScores extends React.PureComponent<IPeriodScoresProps, void> {
	render() {
		const { periodScores } = this.props;
		const { user, monthScore, yearScore, lifetimeScore } = periodScores;
		return (
			<div className={styles.root}>
				<h1>{user}</h1>
				<table className={styles.table}>
					<tbody>
						<PeriodScore periodScore={monthScore} />
						<PeriodScore periodScore={yearScore} />
						<PeriodScore periodScore={lifetimeScore} />
					</tbody>
				</table>
			</div>
		);
	}
}
