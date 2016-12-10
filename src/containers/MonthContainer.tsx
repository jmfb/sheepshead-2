import * as React from 'react';
import { browserHistory } from 'react-router';
import MonthView from '~/pages/MonthView';
import { IMonth, IScore } from '~/models';
import { getMonthScores } from '~/api/users';
import * as moment from 'moment';

interface IMonthContainerProps {
	params: { month: string, year: string };
}

interface IMonthContainerState {
	month: IMonth;
	scores: IScore[] | null;
}

export default class MonthContainer extends React.PureComponent<IMonthContainerProps, IMonthContainerState> {
	constructor(props: IMonthContainerProps) {
		super(props);
		this.state = {
			month: {
				year: +props.params.year,
				month: props.params.month
			},
			scores: null
		};
	}

	componentDidMount() {
		const { month } = this.state;
		getMonthScores(month).then(scores => {
			this.setState({
				scores
			} as IMonthContainerState);
		});
	}

	componentWillReceiveProps(nextProps: IMonthContainerProps) {
		const { month } = this.state;
		const nextMonth = {
			year: +nextProps.params.year,
			month: nextProps.params.month
		};
		if (month.month !== nextMonth.month || month.year !== nextMonth.year) {
			this.setState({
				month: nextMonth,
				scores: null
			});
			getMonthScores(nextMonth).then(scores => {
				this.setState({
					scores
				} as IMonthContainerState);
			});
		}
	}

	handleClickPreviousMonth = () => {
		this.navigateToRelativeMonth(-1);
	}

	handleClickNextMonth = () => {
		this.navigateToRelativeMonth(1);
	}

	navigateToRelativeMonth = (months: number) => {
		const { month } = this.state;
		const relativeMonth = moment(`${month.month} 1 ${month.year}`, 'MMMM d YYYY').add(months, 'months');
		browserHistory.push(`/leader/${relativeMonth.format('YYYY/MMMM')}`);
	}

	render() {
		const { month, scores } = this.state;
		return (
			<MonthView
				{...{month, scores}}
				onClickPreviousMonth={this.handleClickPreviousMonth}
				onClickNextMonth={this.handleClickNextMonth} />
		);
	}
}
