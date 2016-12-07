import * as React from 'react';
import { browserHistory } from 'react-router';
import ManageUsers from './pages/ManageUsers';
import { IAllUserData } from './models';
import { getAllUserData } from './api/users';

interface IManageUsersContainerState {
	users: IAllUserData[];
}

export default class ManageUsersContainer extends React.PureComponent<void, IManageUsersContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { users: [] };
	}

	componentDidMount() {
		getAllUserData().then(users => {
			this.setState({ users });
		});
	}

	handleClickCreateUser = () => {
		browserHistory.push('/admin/user/create');
	}

	handleClickUser = (user: IAllUserData) => {
		browserHistory.push({
			pathname: '/admin/user/edit',
			state: user
		});
	}

	render() {
		const { users } = this.state;
		return (
			<ManageUsers
				{...{users}}
				onClickCreateUser={this.handleClickCreateUser}
				onClickUser={this.handleClickUser} />
		);
	}
}
