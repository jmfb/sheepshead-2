import * as React from 'react';
import { IScore } from '../models';
import * as cx from 'classnames';
import * as styles from './Leaderboard.scss';

interface ILeaderboardProps {
	scores: IScore[];
}

export default class Leaderboard extends React.PureComponent<ILeaderboardProps, void> {
	computeRank = (score: number) => {
		const { scores } = this.props;
		return 1 + scores.filter(s => s.score > score).length;
	}

	render() {
		const { scores } = this.props;
		return(
			<div className={styles.root}>
				{scores.map((score, i) => (
					<div key={i} className={styles.row}>
						<div className={styles.rank}>#{this.computeRank(score.score)}</div>
						<div className={styles.player}>{score.user}</div>
						<div className={cx(styles.score, { [styles.negative]: score.score < 0 })}>{score.score}</div>
					</div>
				))}
			</div>
		);
	}
}
