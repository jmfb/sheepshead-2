import * as React from 'react';
import DateDisplay from './DateDisplay';
import PointSpread from './PointSpread';
import { IGame } from '../models';
import * as cx from 'classnames';
import * as styles from './Game.scss';

interface IGameProps {
	game: IGame;
	onClick: () => void;
}

export default class Game extends React.PureComponent<IGameProps, {}> {
	render() {
		const { game, onClick } = this.props;
		return(
			<div className={styles.root}>
				<div className={styles.title} onClick={onClick}>Game #{game.id}</div>
				<DateDisplay value={game.when} />
				<div className={styles.scores}>
					{game.scores.map((score, i) => (
						<div key={i} className={styles.row}>
							<div className={styles.player}>{score.user}</div>
							<div className={cx(styles.score, { [styles.negative]: score.score < 0 })}>{score.score}</div>
						</div>
					))}
				</div>
				<PointSpread scores={game.scores} />
			</div>
		);
	}
}
