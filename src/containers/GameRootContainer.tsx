import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateGameContainer from '~/containers/CreateGameContainer';
import GameContainer from '~/containers/GameContainer';
import EditGameContainer from '~/containers/EditGameContainer';

export default class GameRootContainer extends React.PureComponent {
	render() {
		return (
			<Switch>
				<Route path='/game/create' component={CreateGameContainer} />
				<Route path='/game/view/:gameId' component={GameContainer} />
				<Route path='/game/edit/:gameId' component={EditGameContainer} />
			</Switch>
		);
	}
}
