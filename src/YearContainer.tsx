import * as React from 'react';

interface IYearContainerProps {
	params: { year: string }
}

interface IYearContainerState {
	year: number;
}

export default class YearContainer extends React.PureComponent<IYearContainerProps, IYearContainerState> {
	constructor(props: IYearContainerProps) {
		super(props);
		this.state = {
			year: +props.params.year
		};
	}

	componentDidMount() {
		const { year } = this.state;
		//TODO: load leader board for given year
	}

	componentWillReceiveProps(nextProps: IYearContainerProps) {
		const { year } = this.state;
		const nextYear = +nextProps.params.year;
		if (year !== nextYear) {
			this.setState({
				year: nextYear
			});
			//TODO: load leader board for new year
		}
	}
}
