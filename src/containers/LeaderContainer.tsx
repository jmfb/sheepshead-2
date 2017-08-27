import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import LeaderboardSelect from '~/components/LeaderboardSelect';
import DefaultLeaderContainer from '~/containers/DefaultLeaderContainer';
import GamesContainer from '~/containers/GamesContainer';
import LifetimeContainer from '~/containers/LifetimeContainer';
import YearContainer from '~/containers/YearContainer';
import MonthContainer from '~/containers/MonthContainer';
import * as moment from 'moment';

export default class LeaderContainer extends React.PureComponent {
	render() {
		const now = moment();
		const year = now.year();
		const month = now.format('MMMM');
		return (
			<div>
				<LeaderboardSelect {...{year, month}} />
				<Switch>
					<Route path='/leader/games' component={GamesContainer} />
					<Route path='/leader/lifetime' component={LifetimeContainer} />
					<Route path='/leader/:year/:month' component={MonthContainer} />
					<Route path='/leader/:year' component={YearContainer} />
					<Route path='/leader' component={DefaultLeaderContainer} />
				</Switch>
			</div>
		);
	}
}
