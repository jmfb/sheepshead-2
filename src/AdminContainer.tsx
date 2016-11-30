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

	render() {
		return(
			<Administration
				onClickAddUser={this.handleClickAddUser}
				onClickUploadGames={this.handleClickUploadGames} />
		);
	}
}
