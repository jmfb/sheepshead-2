import * as React from 'react';
import { IScore } from '../models';
import * as cx from 'classnames';
import * as styles from './ScoresTile.scss';

interface IScoresTileProps {
	scores: IScore[];
}

export default class ScoresTile extends React.PureComponent<IScoresTileProps, {}> {
	render() {
		const { scores } = this.props;
		return(
			<div className={styles.root}>
				{scores.map((score, i) => (
					<div key={i} className={styles.row}>
						<div className={styles.player}>{score.user}</div>
						<div className={cx(styles.score, { [styles.negative]: score.score < 0 })}>{score.score}</div>
					</div>
				))}
			</div>
		);
	}
}
