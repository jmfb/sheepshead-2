import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import CreateUser from '~/pages/CreateUser';
import { updateUser } from '~/api/users';

interface ICreateUserContainerProps {
	history: History;
}

interface ICreateUserContainerState {
	user: string;
	account: string;
	submitting: boolean;
}

class CreateUserContainer extends React.PureComponent<ICreateUserContainerProps, ICreateUserContainerState> {
	constructor(props: ICreateUserContainerProps) {
		super(props);
		this.state = {
			user: '',
			account: '',
			submitting: false
		};
	}

	handleUpdateUser = (value: string) => {
		this.setState({ user: value });
	}

	handleUpdateAccount = (value: string) => {
		this.setState({ account: value });
	}

	handleCreateUser = () => {
		const { history } = this.props;
		const { user, account } = this.state;
		this.setState({ submitting: true });
		updateUser(user, 1, [account].filter(a => a !== '')).then(() => {
			history.push('/admin/users');
		});
	}

	render() {
		const { user, account, submitting } = this.state;
		return (
			<CreateUser
				{...{user, account, submitting}}
				onUpdateUser={this.handleUpdateUser}
				onUpdateAccount={this.handleUpdateAccount}
				onClickCreate={this.handleCreateUser}
				/>
		);
	}
}

export default withRouter(CreateUserContainer);
