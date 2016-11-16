import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import HomeContainer from './HomeContainer';
import LeaderContainer from './LeaderContainer';
import AdminContainer from './AdminContainer';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path='/' component={HomeContainer} />
		<Route path='/leader' component={LeaderContainer} />
		<Route path='/admin' component={AdminContainer} />
	</Router>,
	document.getElementById('root')
);
