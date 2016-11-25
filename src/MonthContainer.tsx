import * as React from 'react';
import { IMonth } from './models';

interface IMonthContainerProps {
	params: { month: string, year: string }
}

interface IMonthContainerState {
	month: IMonth;
}

export default class MonthContainer extends React.PureComponent<IMonthContainerProps, IMonthContainerState> {
	constructor(props: IMonthContainerProps) {
		super(props);
		this.state = {
			month: {
				year: +props.params.year,
				month: props.params.month
			}
		};
	}

	componentDidMount() {
		const { month } = this.state;
		//TODO: load leader board for given month
	}

	componentWillReceiveProps(nextProps: IMonthContainerProps) {
		const { month } = this.state;
		const nextMonth = {
			year: +nextProps.params.year,
			month: nextProps.params.month
		};
		if (month.month !== nextMonth.month || month.year !== nextMonth.year) {
			this.setState({
				month: nextMonth
			});
			//TODO: load leader board for new month
		}
	}
}
