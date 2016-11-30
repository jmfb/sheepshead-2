import * as React from 'react';
import Banner from '../components/Banner';
import PeriodNavigator from '../components/PeriodNavigator';
import Leaderboard from '../components/Leaderboard';
import { IScore } from '../models';
import * as styles from './YearView.scss';

interface IYearViewProps {
	year: number;
	scores: IScore[] | null;
	onClickPreviousYear: () => void;
	onClickNextYear: () => void;
}

export default class YearView extends React.PureComponent<IYearViewProps, void> {
	render() {
		const { year, scores, onClickPreviousYear, onClickNextYear } = this.props;
		return(
			<div className={styles.root}>
				<PeriodNavigator
					period={year.toString()}
					onClickPreviousPeriod={onClickPreviousYear}
					onClickNextPeriod={onClickNextYear}
					/>
				{scores === null ?
					<Banner type='message' display='Loading scores...' /> :
					<Leaderboard scores={scores} />
				}
			</div>
		);
	}
}
