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
import ErrorContainer from './ErrorContainer';
import ManageUsersContainer from './ManageUsersContainer';
import EditUserContainer from './EditUserContainer';
import CreateGameContainer from './CreateGameContainer';
import { playerRoleId, adminRoleId } from './models';
import './index.scss';

function authenticate(nextState: RouterState, redirect: RedirectFunction) {
	if (localStorage.getItem('roleId') == null) {
		localStorage.removeItem('token');
	}
	if (localStorage.getItem('token') == null) {
		redirect({
			pathname: '/login',
			state: { returnTo: nextState.location.pathname }
		});
	}
};

function authorizeRole(minRoleId: number, nextState: RouterState, redirect: RedirectFunction) {
	if (+localStorage.getItem('roleId') < minRoleId) {
		redirect({
			pathname: '/login',
			state: { returnTo: nextState.location.pathname }
		});
	}
}

function onlyPlayers(nextState: RouterState, redirect: RedirectFunction) {
	return authorizeRole(playerRoleId, nextState, redirect);
}

function onlyAdmins(nextState: RouterState, redirect: RedirectFunction) {
	return authorizeRole(adminRoleId, nextState, redirect);
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/login' component={LoginContainer} />
		<Route path='/authenticate' component={AuthenticateContainer} />
		<Route path='/error' component={ErrorContainer} />
		<Route path='/' component={ApplicationContainer} onEnter={authenticate}>
			<IndexRoute component={HomeContainer} />
			<Route path='leader' component={LeaderContainer}>
				<IndexRoute component={GamesContainer} />
				<Route path=':year' component={YearContainer} />
				<Route path=':year/:month' component={MonthContainer} />
			</Route>
			<Route path='admin' onEnter={onlyAdmins}>
				<IndexRoute component={AdminContainer} />
				<Route path='users' component={ManageUsersContainer} />
				<Route path='user/create' component={CreateUserContainer} />
				<Route path='user/edit' component={EditUserContainer} />
				<Route path='upload' component={UploadGamesContainer} />
			</Route>
			<Route path='game'>
				<Route path='create' component={CreateGameContainer} onEnter={onlyPlayers} />
				<Route path='view/:gameId' component={GameContainer} />
				<Route path='edit/:gameId' component={EditGameContainer} onEnter={onlyPlayers} />
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
