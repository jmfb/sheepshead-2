import * as React from 'react';
import Banner from '~/components/Banner';
import Leaderboard from '~/components/Leaderboard';
import Game from '~/components/Game';
import PointSpread from '~/components/PointSpread';
import { IMonth, IGame, IScore } from '~/models';
import * as styles from './ScoreView.scss';

interface IScoreViewProps {
	month: IMonth;
	game: IGame | null;
	monthScores: IScore[] | null;
	yearScores: IScore[] | null;
}

export default class ScoreView extends React.PureComponent<IScoreViewProps> {
	render() {
		const { month, game, monthScores, yearScores } = this.props;
		return(
			<div className={styles.root}>
				{game === null ?
					<Banner type='message' display='Loading last game...' /> :
					<Game {...{game}} />
				}
				<div className={styles.card}>
					<div className={styles.title}>{month.month}</div>
					{monthScores === null ?
						<Banner type='message' display='Loading month scores...' /> :
						<Leaderboard scores={monthScores} />
					}
					{monthScores !== null &&
						<PointSpread scores={monthScores} />
					}
				</div>
				<div className={styles.card}>
					<div className={styles.title}>{month.year}</div>
					{yearScores === null ?
						<Banner type='message' display='Loading year scores...' /> :
						<Leaderboard scores={yearScores} />
					}
					{yearScores !== null &&
						<PointSpread scores={yearScores} />
					}
				</div>
			</div>
		);
	}
}
