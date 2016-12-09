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

	render() {
		return(
			<Administration
				onClickManageUsers={this.handleClickManageUsers}
				onClickUploadGames={this.handleClickUploadGames} />
		);
	}
}
