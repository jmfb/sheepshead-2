import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import { History } from 'history';
import YearView from '~/pages/YearView';
import { IScore } from '~/models';
import { getYearScores } from '~/api/scores';

interface IYearContainerProps {
	match: match<{ year: string }>;
	history: History;
}

interface IYearContainerState {
	year: number;
	scores: IScore[] | null;
}

class YearContainer extends React.PureComponent<IYearContainerProps, IYearContainerState> {
	constructor(props: IYearContainerProps) {
		super(props);
		this.state = {
			year: +props.match.params.year,
			scores: null
		};
	}

	componentDidMount() {
		const { year } = this.state;
		getYearScores(year).then(scores => {
			this.setState({ scores });
		});
	}

	componentWillReceiveProps(nextProps: IYearContainerProps) {
		const { year } = this.state;
		const nextYear = +nextProps.match.params.year;
		if (year !== nextYear) {
			this.setState({
				year: nextYear,
				scores: null
			});
			getYearScores(nextYear).then(scores => {
				this.setState({ scores });
			});
		}
	}

	handleClickPreviousYear = () => {
		const { history } = this.props;
		const { year } = this.state;
		history.push(`/leader/${year - 1}`);
	}

	handleClickNextYear = () => {
		const { history } = this.props;
		const { year } = this.state;
		history.push(`/leader/${year + 1}`);
	}

	render() {
		const { year, scores } = this.state;
		return (
			<YearView
				{...{year, scores}}
				onClickPreviousYear={this.handleClickPreviousYear}
				onClickNextYear={this.handleClickNextYear}
				/>
		);
	}
}

export default withRouter(YearContainer);
