import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminContainer from '~/containers/AdminContainer';
import ManageUsersContainer from '~/containers/ManageUsersContainer';
import CreateUserContainer from '~/containers/CreateUserContainer';
import EditUserContainer from '~/containers/EditUserContainer';
import PayoutsContainer from '~/containers/PayoutsContainer';
import UploadGamesContainer from '~/containers/UploadGamesContainer';
import { adminRoleId } from '~/models';

interface IAdminRootContainerState {
	isAuthenticated: boolean;
}

export default class AdminRootContainer extends React.PureComponent<{}, IAdminRootContainerState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			isAuthenticated: +localStorage.getItem('roleId') >= adminRoleId
		};
	}

	render() {
		const { isAuthenticated } = this.state;
		if (!isAuthenticated) {
			return (
				<Redirect to='/login' />
			);
		}
		return (
			<Switch>
				<Route path='/admin/users' component={ManageUsersContainer} />
				<Route path='/admin/user/create' component={CreateUserContainer} />
				<Route path='/admin/user/edit' component={EditUserContainer} />
				<Route path='/admin/payouts/:year/:month' component={PayoutsContainer} />
				<Route path='/admin/upload' component={UploadGamesContainer} />
				<Route path='/admin' component={AdminContainer} />
			</Switch>
		);
	}
}
