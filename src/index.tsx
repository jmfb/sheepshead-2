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
import './index.scss';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/' component={ApplicationContainer}>
			<IndexRoute component={HomeContainer} />
			<Route path='leader' component={LeaderContainer}>
				<IndexRoute component={GamesContainer} />
				<Route path=':year' component={YearContainer} />
				<Route path=':year/:month' component={MonthContainer} />
			</Route>
			<Route path='admin'>
				<IndexRoute component={AdminContainer} />
				<Route path='user/create' component={CreateUserContainer} />
				<Route path='upload' component={UploadGamesContainer} />
			</Route>
			<Route path='game/:gameId' component={GameContainer} />
			<Route path='edit/:gameId' component={EditGameContainer} />
		</Route>
	</Router>,
	document.getElementById('root')
);
