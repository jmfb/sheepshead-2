import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import ManageUsers from '~/pages/ManageUsers';
import { IAllUserData } from '~/models';
import { getAllUserData } from '~/api/users';

interface IManageUsersContainerProps {
	history: History;
}

interface IManageUsersContainerState {
	users: IAllUserData[];
	roleFilter: string;
}

const roleFilters: { [key: string]: number[] } = {
	['All']: [0, 1, 2],
	['Active']: [1, 2],
	['Observer']: [0],
	['Player']: [1],
	['Admin']: [2]
};

class ManageUsersContainer extends React.PureComponent<IManageUsersContainerProps, IManageUsersContainerState> {
	constructor(props: IManageUsersContainerProps) {
		super(props);
		this.state = {
			users: [],
			roleFilter: 'Active'
		};
	}

	componentDidMount() {
		getAllUserData().then(users => {
			this.setState({ users } as IManageUsersContainerState);
		});
	}

	handleChangeRoleFilter = (roleFilter: string) => {
		this.setState({ roleFilter } as IManageUsersContainerState);
	}

	handleClickCreateUser = () => {
		const { history } = this.props;
		history.push('/admin/user/create');
	}

	handleClickUser = (user: IAllUserData) => {
		const { history } = this.props;
		history.push({
			pathname: '/admin/user/edit',
			state: user
		});
	}

	getFilteredUsers = () => {
		const { users, roleFilter } = this.state;
		const roles = roleFilters[roleFilter];
		return users.filter(user => roles.indexOf(user.roleId) !== -1);
	}

	render() {
		const { roleFilter } = this.state;
		const users = this.getFilteredUsers();
		return (
			<ManageUsers
				{...{users, roleFilter}}
				onChangeRoleFilter={this.handleChangeRoleFilter}
				onClickCreateUser={this.handleClickCreateUser}
				onClickUser={this.handleClickUser}
				/>
		);
	}
}

export default withRouter(ManageUsersContainer);
