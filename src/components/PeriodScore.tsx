import * as React from 'react';
import { IPeriodScore } from '~/models';
import * as styles from './PeriodScore.scss';
import * as cx from 'classnames';
import * as pluralize from 'pluralize';

interface IPeriodScoreProps {
	periodScore: IPeriodScore;
}

export default class PeriodScore extends React.PureComponent<IPeriodScoreProps, void> {
	getPeriod = () => {
		const { periodScore } = this.props;
		const { period } = periodScore;
		if (period === undefined) {
			return 'Lifetime';
		}
		if (typeof(period) === 'number') {
			return period.toString();
		}
		const { month } = period;
		return month;
	}

	render() {
		const { periodScore } = this.props;
		const { gameCount, score, rank } = periodScore;
		return (
			<div className={styles.root}>
				<div className={styles.row}>
					<div className={styles.period}>{this.getPeriod()}</div>
					{gameCount === 0 && <div className={styles.none}>No games played.</div>}
					{gameCount > 0 && <div className={styles.count}>{gameCount} {pluralize('game', gameCount)}</div>}
					{gameCount > 0 && <div className={cx(styles.score, { [styles.negative]: score < 0 })}>{score}</div>}
					{gameCount > 0 && <div className={styles.rank}>#{rank}</div>}
				</div>
				<div className={styles.graph}>
				</div>
			</div>
		);
	}
}
