import * as React from 'react';
import PeriodRank from '../components/PeriodRank';
import { IPeriodScore, IMonth } from '../models';
import * as styles from './ScoreView.scss';

interface IScoreViewProps {
	user: string;
	monthScore: IPeriodScore;
	yearScore: IPeriodScore;
	onClickMonth: () => void;
	onClickYear: () => void;
};

export default class ScoreView extends React.PureComponent<IScoreViewProps, void> {
	render() {
		const { user, monthScore, yearScore, onClickMonth, onClickYear } = this.props;
		const month = monthScore.period as IMonth;
		const year = yearScore.period as number;
		return(
			<div className={styles.root}>
				<h1 className={styles.title}>{user}</h1>
				<PeriodRank
					period={month.month}
					score={monthScore.score}
					rank={monthScore.rank}
					onClick={onClickMonth} />
				<PeriodRank
					period={year.toString()}
					score={yearScore.score}
					rank={yearScore.rank}
					onClick={onClickYear} />
				{this.props.children}
			</div>
		);
	}
}
