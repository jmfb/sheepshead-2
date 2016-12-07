import * as React from 'react';
import CreateUser from './pages/CreateUser';
import { updateUser } from './api/users';

interface ICreateUserContainerState {
	user: string;
	account: string;
	submitting: boolean;
	created: string | null;
}

export default class CreateUserContainer extends React.PureComponent<void, ICreateUserContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			user: '',
			account: '',
			submitting: false,
			created: null
		};
	}

	handleUpdateUser = (value: string) => {
		this.setState({
			user: value,
			created: null
		} as ICreateUserContainerState);
	}

	handleUpdateAccount = (value: string) => {
		this.setState({
			account: value,
			created: null
		} as ICreateUserContainerState);
	}

	handleCreateUser = () => {
		const { user, account } = this.state;
		this.setState({
			user: '',
			account: '',
			submitting: true,
			created: user
		} as ICreateUserContainerState);
		updateUser(user, 1, [account]).then(() => {
			this.setState({
				submitting: false
			} as ICreateUserContainerState);
		});
	}

	render() {
		const { user, account, submitting, created } = this.state;
		return(
			<CreateUser
				{...{user, account, submitting, created}}
				onUpdateUser={this.handleUpdateUser}
				onUpdateAccount={this.handleUpdateAccount}
				onClickCreate={this.handleCreateUser} />
		);
	}
}
