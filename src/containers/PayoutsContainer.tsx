import * as React from 'react';
import { match } from 'react-router-dom';
import PayoutsView from '~/pages/PayoutsView';
import { IMonth, IScore, IAllUserData } from '~/models';
import { getMonthScores } from '~/api/scores';
import { getAllUserData } from '~/api/users';

interface IPayoutsContainerProps {
	match: match<{ month: string, year: string }>;
}

interface IPayoutsContainerState {
	month: IMonth;
	scores: IScore[] | null;
	users: IAllUserData[] | null;
}

export default class PayoutsContainer extends React.PureComponent<IPayoutsContainerProps, IPayoutsContainerState> {
	constructor(props: IPayoutsContainerProps) {
		super(props);
		this.state = {
			month: {
				year: +props.match.params.year,
				month: props.match.params.month
			},
			scores: null,
			users: null
		};
	}

	componentDidMount() {
		const { month } = this.state;
		getMonthScores(month).then(scores => {
			this.setState({
				scores
			} as IPayoutsContainerState);
		});
		getAllUserData().then(users => {
			this.setState({
				users
			} as IPayoutsContainerState);
		});
	}

	render() {
		const { month, scores, users } = this.state;
		return (
			<PayoutsView {...{month, scores, users}} />
		);
	}
}
