import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '~/reducers';
import AdminContainer from '~/containers/AdminContainer';
import ManageUsersContainer from '~/containers/ManageUsersContainer';
import CreateUserContainer from '~/containers/CreateUserContainer';
import EditUserContainer from '~/containers/EditUserContainer';
import PayoutsContainer from '~/containers/PayoutsContainer';
import UploadGamesContainer from '~/containers/UploadGamesContainer';
import { adminRoleId } from '~/models';

interface IAdminRootContainerProps {
	isAuthenticated: boolean;
}

function mapStateToProps(state: IState): IAdminRootContainerProps {
	return {
		isAuthenticated: state.currentUser.roleId >= adminRoleId
	};
}

class AdminRootContainer extends React.PureComponent<IAdminRootContainerProps> {
	render() {
		const { isAuthenticated } = this.props;
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

export default connect(mapStateToProps)(AdminRootContainer);
