import * as React from 'react';
import Banner from '../components/Banner';
import PeriodNavigator from '../components/PeriodNavigator';
import Leaderboard from '../components/Leaderboard';
import { IMonth, IScore } from '../models';

interface IMonthViewProps {
	month: IMonth;
	scores: IScore[] | null;
	onClickPreviousMonth: () => void;
	onClickNextMonth: () => void;
}

export default class MonthView extends React.PureComponent<IMonthViewProps, {}> {
	render() {
		const { month, scores, onClickPreviousMonth, onClickNextMonth } = this.props;
		return(
			<div>
				<PeriodNavigator
					period={`${month.month} ${month.year}`}
					onClickPreviousPeriod={onClickPreviousMonth}
					onClickNextPeriod={onClickNextMonth}
					/>
				{scores === null ?
					<Banner type='message' display='Loading scores...' /> :
					<Leaderboard scores={scores} />
				}
			</div>
		);
	}
}