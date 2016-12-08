import * as React from 'react';
import { browserHistory } from 'react-router';
import CreateUser from './pages/CreateUser';
import { updateUser } from './api/users';

interface ICreateUserContainerState {
	user: string;
	account: string;
	submitting: boolean;
}

export default class CreateUserContainer extends React.PureComponent<void, ICreateUserContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			user: '',
			account: '',
			submitting: false
		};
	}

	handleUpdateUser = (value: string) => {
		this.setState({ user: value } as ICreateUserContainerState);
	}

	handleUpdateAccount = (value: string) => {
		this.setState({ account: value } as ICreateUserContainerState);
	}

	handleCreateUser = () => {
		const { user, account } = this.state;
		this.setState({ submitting: true } as ICreateUserContainerState);
		updateUser(user, 1, [account].filter(a => a !== '')).then(() => {
			browserHistory.push('/admin/users');
		});
	}

	render() {
		const { user, account, submitting } = this.state;
		return(
			<CreateUser
				{...{user, account, submitting}}
				onUpdateUser={this.handleUpdateUser}
				onUpdateAccount={this.handleUpdateAccount}
				onClickCreate={this.handleCreateUser} />
		);
	}
}
