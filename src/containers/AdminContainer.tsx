import * as React from 'react';
import { browserHistory } from 'react-router';
import Administration from '~/pages/Administration';
import * as moment from 'moment';

export default class AdminContainer extends React.PureComponent<void, void> {
	handleClickManageUsers = () => {
		browserHistory.push('/admin/users');
	}

	handleClickPayouts = () => {
		const lastMonth = moment().add(-1, 'months');
		browserHistory.push(`/admin/payouts/${lastMonth.format('YYYY/MMMM')}`);
	}

	handleClickUploadGames = () => {
		browserHistory.push('/admin/upload');
	}

	render() {
		return (
			<Administration
				onClickManageUsers={this.handleClickManageUsers}
				onClickPayouts={this.handleClickPayouts}
				onClickUploadGames={this.handleClickUploadGames} />
		);
	}
}
