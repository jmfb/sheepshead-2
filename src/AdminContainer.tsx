import * as React from 'react';
import { browserHistory } from 'react-router';
import Administration from './pages/Administration';
import { authenticationService } from './services/AuthenticationService';

export default class AdminContainer extends React.PureComponent<void, void> {
	handleClickAddUser = () => {
		browserHistory.push('/admin/user/create');
	}

	handleClickUploadGames = () => {
		browserHistory.push('/admin/upload');
	}

	handleClickLogout = () => {
		authenticationService.logout();
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
