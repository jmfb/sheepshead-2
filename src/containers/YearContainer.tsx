import * as React from 'react';
import { browserHistory } from 'react-router';
import YearView from '~/pages/YearView';
import { IScore } from '~/models';
import { getYearScores } from '~/api/scores';

interface IYearContainerProps {
	params: { year: string };
}

interface IYearContainerState {
	year: number;
	scores: IScore[] | null;
}

export default class YearContainer extends React.PureComponent<IYearContainerProps, IYearContainerState> {
	constructor(props: IYearContainerProps) {
		super(props);
		this.state = {
			year: +props.params.year,
			scores: null
		};
	}

	componentDidMount() {
		const { year } = this.state;
		getYearScores(year).then(scores => {
			this.setState({ scores } as IYearContainerState);
		});
	}

	componentWillReceiveProps(nextProps: IYearContainerProps) {
		const { year } = this.state;
		const nextYear = +nextProps.params.year;
		if (year !== nextYear) {
			this.setState({
				year: nextYear,
				scores: null
			});
			getYearScores(nextYear).then(scores => {
				this.setState({ scores } as IYearContainerState);
			});
		}
	}

	handleClickPreviousYear = () => {
		const { year } = this.state;
		browserHistory.push(`/leader/${year - 1}`);
	}

	handleClickNextYear = () => {
		const { year } = this.state;
		browserHistory.push(`/leader/${year + 1}`);
	}

	render() {
		const { year, scores } = this.state;
		return (
			<YearView
				{...{year, scores}}
				onClickPreviousYear={this.handleClickPreviousYear}
				onClickNextYear={this.handleClickNextYear} />
		);
	}
}
