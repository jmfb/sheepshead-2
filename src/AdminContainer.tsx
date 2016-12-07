import * as React from 'react';
import { browserHistory } from 'react-router';
import Administration from './pages/Administration';

export default class AdminContainer extends React.PureComponent<void, void> {
	handleClickManageUsers = () => {
		browserHistory.push('/admin/users');
	}

	handleClickUploadGames = () => {
		browserHistory.push('/admin/upload');
	}

	handleClickLogout = () => {
		localStorage.removeItem('token');
		browserHistory.push('/login');
	}

	render() {
		return(
			<Administration
				onClickManageUsers={this.handleClickManageUsers}
				onClickUploadGames={this.handleClickUploadGames}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
