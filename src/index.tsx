import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import ApplicationContainer from '~/containers/ApplicationContainer';
import AuthenticateContainer from '~/containers/AuthenticateContainer';
import LoginContainer from '~/containers/LoginContainer';
import ErrorContainer from '~/containers/ErrorContainer';
import { rootReducer } from '~/reducers';
import './index.scss';

export let history: History = undefined;
const store = createStore(
	rootReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

render(
	<Provider store={store}>
		<BrowserRouter ref={router => history = (router as any).history}>
			<Switch>
				<Route path='/login' component={LoginContainer} />
				<Route path='/authenticate' component={AuthenticateContainer} />
				<Route path='/error' component={ErrorContainer} />
				<Route path='/' component={ApplicationContainer} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
