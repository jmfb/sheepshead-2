import * as React from 'react';
import CreateUser from './pages/CreateUser';
import { createUser } from './api/users';

interface ICreateUserContainerState {
	user: string;
	submitting: boolean;
	created: string | null;
}

export default class CreateUserContainer extends React.PureComponent<{}, ICreateUserContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			user: '',
			submitting: false,
			created: null
		};
	}

	handleUpdateUser = (value: string) => {
		this.setState({
			user: value,
			created: null
		} as ICreateUserContainerState);
	};

	handleCreateUser = () => {
		const { user } = this.state;
		this.setState({
			user: '',
			submitting: true,
			created: user
		} as ICreateUserContainerState);
		createUser(user).then(() => {
			this.setState({
				submitting: false
			} as ICreateUserContainerState);
		});
	};

	render() {
		const { user, submitting, created } = this.state;
		return(
			<CreateUser
				{...{user, submitting, created}}
				onUpdateUser={this.handleUpdateUser}
				onClickCreate={this.handleCreateUser} />
		);
	}
}
