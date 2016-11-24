import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ApplicationContainer from './ApplicationContainer';
import HomeContainer from './HomeContainer';
import LeaderContainer from './LeaderContainer';
import AdminContainer from './AdminContainer';
import GameContainer from './GameContainer';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path='/' component={ApplicationContainer}>
			<IndexRoute component={HomeContainer} />
			<Route path='/leader' component={LeaderContainer} />
			<Route path='/admin' component={AdminContainer} />
			<Route path='/game/:gameId' component={GameContainer} />
		</Route>
	</Router>,
	document.getElementById('root')
);
