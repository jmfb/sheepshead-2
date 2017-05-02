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
import ApplicationContainer from './containers/ApplicationContainer';
import HomeContainer from './containers/HomeContainer';
import LeaderContainer from './containers/LeaderContainer';
import AdminContainer from './containers/AdminContainer';
import GameContainer from './containers/GameContainer';
import EditGameContainer from './containers/EditGameContainer';
import YearContainer from './containers/YearContainer';
import MonthContainer from './containers/MonthContainer';
import GamesContainer from './containers/GamesContainer';
import CreateUserContainer from './containers/CreateUserContainer';
import PayoutsContainer from './containers/PayoutsContainer';
import UploadGamesContainer from './containers/UploadGamesContainer';
import AuthenticateContainer from './containers/AuthenticateContainer';
import LoginContainer from './containers/LoginContainer';
import ErrorContainer from './containers/ErrorContainer';
import ManageUsersContainer from './containers/ManageUsersContainer';
import EditUserContainer from './containers/EditUserContainer';
import CreateGameContainer from './containers/CreateGameContainer';
import LifetimeContainer from './containers/LifetimeContainer';
import DefaultLeaderContainer from './containers/DefaultLeaderContainer';
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
				<IndexRoute component={DefaultLeaderContainer} />
				<Route path='games' component={GamesContainer} />
				<Route path='lifetime' component={LifetimeContainer} />
				<Route path=':year' component={YearContainer} />
				<Route path=':year/:month' component={MonthContainer} />
			</Route>
			<Route path='admin' onEnter={onlyAdmins}>
				<IndexRoute component={AdminContainer} />
				<Route path='users' component={ManageUsersContainer} />
				<Route path='user/create' component={CreateUserContainer} />
				<Route path='user/edit' component={EditUserContainer} />
				<Route path='payouts/:year/:month' component={PayoutsContainer} />
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
