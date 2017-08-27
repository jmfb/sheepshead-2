import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import EditUser from '~/pages/EditUser';
import { IAllUserData, IRole } from '~/models';
import { renameUser, updateUser, deleteUser } from '~/api/users';

interface IEditUserContainerProps {
	history: History;
}

interface IEditUserContainerState {
	originalName: string;
	name: string;
	roleId: IRole;
	totalGameCount: number;
	lifetimeScore: number;
	lastGameWhen: string | null;
	accounts: string[];
	submitting: boolean;
}

class EditUserContainer extends React.PureComponent<IEditUserContainerProps, IEditUserContainerState> {
	constructor(props: IEditUserContainerProps) {
		super(props);
		const state = props.history.location.state as IAllUserData;
		if (state) {
			this.state = Object.assign({ originalName: state.name, submitting: false }, state);
		} else {
			props.history.push('/admin/users');
		}
	}

	handleUpdateName = (value: string) => {
		this.setState({ name: value } as IEditUserContainerState);
	}

	handleUpdateRole = (value: IRole) => {
		this.setState({ roleId: value } as IEditUserContainerState);
	}

	handleUpdateAccount = (index: number, value: string) => {
		const { accounts } = this.state;
		const newAccounts = [...accounts];
		if (value === '') {
			newAccounts.splice(index, 1);
		} else {
			newAccounts[index] = value;
		}
		this.setState({ accounts: newAccounts } as IEditUserContainerState);
	}

	handleAddAccount = () => {
		const { accounts } = this.state;
		const newAccounts = [...accounts, ''];
		this.setState({ accounts: newAccounts } as IEditUserContainerState);
	}

	handleClickSubmit = () => {
		const { originalName, name } = this.state;
		this.setState({ submitting: true } as IEditUserContainerState);
		if (originalName === name) {
			this.saveChanges();
		} else {
			renameUser(originalName, name).then(this.saveChanges);
		}
	}

	handleClickDelete = () => {
		const { history } = this.props;
		const { originalName } = this.state;
		this.setState({ submitting: true } as IEditUserContainerState);
		deleteUser(originalName).then(() => {
			history.push('/admin/users');
		});
	}

	saveChanges = () => {
		const { history } = this.props;
		const { name, roleId, accounts } = this.state;
		updateUser(name, roleId, accounts).then(() => {
			history.push('/admin/users');
		});
	}

	render() {
		const { name, roleId, totalGameCount, lifetimeScore, lastGameWhen, accounts, submitting } = this.state;
		return (
			<EditUser
				{...{name, roleId, totalGameCount, lifetimeScore, lastGameWhen, accounts, submitting}}
				onUpdateName={this.handleUpdateName}
				onUpdateRole={this.handleUpdateRole}
				onUpdateAccount={this.handleUpdateAccount}
				onAddAccount={this.handleAddAccount}
				onClickSubmit={this.handleClickSubmit}
				onClickDelete={this.handleClickDelete}
				/>
		);
	}
}

export default withRouter(EditUserContainer);
