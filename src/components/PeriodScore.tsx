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
			<tr className={styles.root}>
				<td className={styles.period}>{this.getPeriod()}</td>
				{gameCount === 0 && <td colSpan={3} className={styles.none}>No games played.</td>}
				{gameCount > 0 && <td className={styles.count}>{gameCount} {pluralize('game', gameCount)}</td>}
				{gameCount > 0 && <td className={cx(styles.score, { [styles.negative]: score < 0 })}>{score}</td>}
				{gameCount > 0 && <td className={styles.rank}>#{rank}</td>}
			</tr>
		);
	}
}
