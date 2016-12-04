import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	Router,
	Route,
	IndexRoute,
	RouterState,
	RedirectFunction,
	browserHistory
} from 'react-router';
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
import AuthenticateContainer from './AuthenticateContainer';
import LoginContainer from './LoginContainer';
import { authenticationService } from './services/AuthenticationService';
import './index.scss';

function authenticate(nextState: RouterState, redirect: RedirectFunction) {
	if (!authenticationService.isAuthenticated()) {
		redirect({
			pathname: '/login',
			state: { returnTo: nextState.location.pathname }
		});
	}
};

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/login' component={LoginContainer} />
		<Route path='/authenticate' component={AuthenticateContainer} />
		<Route path='/' component={ApplicationContainer} onEnter={authenticate}>
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
