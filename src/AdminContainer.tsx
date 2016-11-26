import * as React from 'react';
import { hashHistory } from 'react-router';
import Administration from './pages/Administration';

export default class AdminContainer extends React.PureComponent<{}, {}> {
	handleClickAddUser = () => {
		hashHistory.push('/admin/user/create');
	};

	handleClickUploadGames = () => {
		hashHistory.push('/admin/upload');
	};

	render() {
		return(
			<Administration
				onClickAddUser={this.handleClickAddUser}
				onClickUploadGames={this.handleClickUploadGames} />
		);
	}
}
