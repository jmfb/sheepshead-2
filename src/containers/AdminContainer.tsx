import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import Administration from '~/pages/Administration';
import * as moment from 'moment';

interface IAdminContainerProps {
	history: History;
}

class AdminContainer extends React.PureComponent<IAdminContainerProps> {
	handleClickManageUsers = () => {
		const { history } = this.props;
		history.push('/admin/users');
	}

	handleClickPayouts = () => {
		const { history } = this.props;
		const lastMonth = moment().add(-1, 'months');
		history.push(`/admin/payouts/${lastMonth.format('YYYY/MMMM')}`);
	}

	handleClickUploadGames = () => {
		const { history } = this.props;
		history.push('/admin/upload');
	}

	render() {
		return (
			<Administration
				onClickManageUsers={this.handleClickManageUsers}
				onClickPayouts={this.handleClickPayouts}
				onClickUploadGames={this.handleClickUploadGames}
				/>
		);
	}
}

export default withRouter(AdminContainer);
