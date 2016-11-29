import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ApplicationContainer from './ApplicationContainer';
import HomeContainer from './HomeContainer';
import LeaderContainer from './LeaderContainer';
import AdminContainer from './AdminContainer';
import GameContainer from './GameContainer';
import EditGameContainer from './EditGameContainer';
import YearContainer from './YearContainer';
import MonthContainer from './MonthContainer';
import GamesContainer from './GamesContainer';
import CreateUserContainer from './CreateUserContainer';
import UploadGamesContainer from './UploadGamesContainer';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/' component={ApplicationContainer}>
			<IndexRoute component={HomeContainer} />
			<Route path='/leader' component={LeaderContainer}>
				<IndexRoute component={GamesContainer} />
				<Route path='/leader/:year' component={YearContainer} />
				<Route path='/leader/:year/:month' component={MonthContainer} />
			</Route>
			<Route path='/admin' component={AdminContainer} />
			<Route path='/admin/user/create' component={CreateUserContainer} />
			<Route path='/admin/upload' component={UploadGamesContainer} />
			<Route path='/game/:gameId' component={GameContainer} />
			<Route path='/edit/:gameId' component={EditGameContainer} />
		</Route>
	</Router>,
	document.getElementById('root')
);
