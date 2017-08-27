import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import ApplicationContainer from './containers/ApplicationContainer';
import AuthenticateContainer from './containers/AuthenticateContainer';
import LoginContainer from './containers/LoginContainer';
import ErrorContainer from './containers/ErrorContainer';
import './index.scss';

export let history: History = undefined;

ReactDOM.render(
	<BrowserRouter ref={router => history = (router as any).history}>
		<Switch>
			<Route path='/login' component={LoginContainer} />
			<Route path='/authenticate' component={AuthenticateContainer} />
			<Route path='/error' component={ErrorContainer} />
			<Route path='/' component={ApplicationContainer} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
