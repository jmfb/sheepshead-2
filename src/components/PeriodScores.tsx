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
				<div className={styles.table}>
					<PeriodScore id={1} periodScore={monthScore} />
					<PeriodScore id={2} periodScore={yearScore} />
					<PeriodScore id={3} periodScore={lifetimeScore} />
				</div>
			</div>
		);
	}
}
