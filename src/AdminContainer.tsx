import * as React from 'react';
import { browserHistory } from 'react-router';
import Administration from './pages/Administration';

export default class AdminContainer extends React.PureComponent<void, void> {
	handleClickAddUser = () => {
		browserHistory.push('/admin/user/create');
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
				onClickAddUser={this.handleClickAddUser}
				onClickUploadGames={this.handleClickUploadGames}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
