import * as React from 'react';
import DateDisplay from './DateDisplay';
import PointSpread from './PointSpread';
import ScoresTile from './ScoresTile';
import { IGame } from '../models';
import * as cx from 'classnames';
import * as styles from './Game.scss';

interface IGameProps {
	game: IGame;
	onClick?: () => void;
}

export default class Game extends React.PureComponent<IGameProps, void> {
	render() {
		const { game, onClick } = this.props;
		return(
			<div className={styles.root}>
				<div
					className={cx(styles.title, { [styles.link]: onClick !== undefined })}
					onClick={onClick}>
					Game #{game.id}
				</div>
				<DateDisplay value={game.when} />
				<ScoresTile scores={game.scores} />
				<PointSpread scores={game.scores} />
			</div>
		);
	}
}
