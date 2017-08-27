import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '~/components/NavBar';
import HomeContainer from '~/containers/HomeContainer';
import LeaderContainer from '~/containers/LeaderContainer';
import AdminRootContainer from '~/containers/AdminRootContainer';
import GameRootContainer from '~/containers/GameRootContainer';
import { IRole } from '~/models';

interface IApplicationContainerState {
	roleId: IRole;
	isAuthenticated: boolean;
}

export default class ApplicationContainer extends React.PureComponent<{}, IApplicationContainerState> {
	constructor(props: {}) {
		super(props);
		const roleId = localStorage.getItem('roleId');
		if (roleId == null) {
			localStorage.removeItem('token');
		}
		const token = localStorage.getItem('token');
		this.state = {
			roleId: +roleId as IRole,
			isAuthenticated: token !== null
		};
	}

	render() {
		const { roleId, isAuthenticated } = this.state;
		if (!isAuthenticated) {
			return (
				<Redirect to='/login' />
			);
		}
		return (
			<div>
				<NavBar {...{roleId}} />
				<main>
					<Switch>
						<Route exact path='/' component={HomeContainer} />
						<Route path='/leader' component={LeaderContainer} />
						<Route path='/admin' component={AdminRootContainer} />
						<Route path='/game' component={GameRootContainer} />
					</Switch>
				</main>
			</div>
		);
	}
}
