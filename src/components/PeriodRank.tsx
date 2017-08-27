import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './PeriodRank.scss';

interface IPeriodRankProps {
	period: string;
	score: number;
	rank: number;
	onClick: () => void;
}

export default class PeriodRank extends React.PureComponent<IPeriodRankProps> {
	render() {
		const { period, score, rank, onClick } = this.props;
		return(
			<div className={styles.root} onClick={onClick}>
				<div className={styles.period}>{period}</div>
				<div className={cx(styles.score, { [styles.negative]: score < 0 })}>{score}</div>
				<div className={styles.rank}>#{rank}</div>
			</div>
		);
	}
}
