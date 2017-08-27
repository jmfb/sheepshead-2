import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import { History } from 'history';
import MonthView from '~/pages/MonthView';
import { IMonth, IScore } from '~/models';
import { getMonthScores } from '~/api/scores';
import * as moment from 'moment';

interface IMonthContainerProps {
	match: match<{ month: string, year: string }>;
	history: History;
}

interface IMonthContainerState {
	month: IMonth;
	scores: IScore[] | null;
}

class MonthContainer extends React.PureComponent<IMonthContainerProps, IMonthContainerState> {
	constructor(props: IMonthContainerProps) {
		super(props);
		this.state = {
			month: {
				year: +props.match.params.year,
				month: props.match.params.month
			},
			scores: null
		};
	}

	componentDidMount() {
		const { month } = this.state;
		getMonthScores(month).then(scores => {
			this.setState({
				scores
			});
		});
	}

	componentWillReceiveProps(nextProps: IMonthContainerProps) {
		const { month } = this.state;
		const nextMonth = {
			year: +nextProps.match.params.year,
			month: nextProps.match.params.month
		};
		if (month.month !== nextMonth.month || month.year !== nextMonth.year) {
			this.setState({
				month: nextMonth,
				scores: null
			});
			getMonthScores(nextMonth).then(scores => {
				this.setState({
					scores
				});
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
		const { history } = this.props;
		const { month } = this.state;
		const relativeMonth = moment(`${month.month} 1 ${month.year}`, 'MMMM d YYYY').add(months, 'months');
		history.push(`/leader/${relativeMonth.format('YYYY/MMMM')}`);
	}

	render() {
		const { month, scores } = this.state;
		return (
			<MonthView
				{...{month, scores}}
				onClickPreviousMonth={this.handleClickPreviousMonth}
				onClickNextMonth={this.handleClickNextMonth}
				/>
		);
	}
}

export default withRouter(MonthContainer);
