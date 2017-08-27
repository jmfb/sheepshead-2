import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import ErrorView from '~/pages/ErrorView';

interface IErrorContainerProps {
	history: History;
}

interface IErrorContainerState {
	status: number;
	statusText: string;
	error: any;
}

class ErrorContainer extends React.Component<IErrorContainerProps, IErrorContainerState> {
	constructor(props: IErrorContainerProps) {
		super(props);
		this.state = { ...props.history.location.state };
	}

	handleClickLogout = () => {
		const { history } = this.props;
		localStorage.removeItem('token');
		localStorage.removeItem('roleId');
		history.push('/login');
	}

	render() {
		const { status, statusText, error } = this.state;
		return (
			<ErrorView
				{...{status, statusText, error}}
				onClickLogout={this.handleClickLogout}
				/>
		);
	}
}

export default withRouter(ErrorContainer);
