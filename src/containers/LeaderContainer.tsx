import * as React from 'react';
import LeaderboardSelect from '~/components/LeaderboardSelect';
import * as moment from 'moment';

export default class LeaderContainer extends React.PureComponent<void, void> {
	render() {
		const { children } = this.props;
		const now = moment();
		const year = now.year();
		const month = now.format('MMMM');
		return (
			<div>
				<LeaderboardSelect {...{year, month}} />
				{children}
			</div>
		);
	}
}
