import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import ErrorView from '~/pages/ErrorView';
import { setCurrentUser } from '~/actions';
import { IRole } from '~/models';

interface IErrorContainerOwnProps {
	history: History;
}

interface IErrorContainerDispatchProps {
	setCurrentUser: (roleId: IRole | null, token: string | null) => void;
}

type IErrorContainerProps = IErrorContainerOwnProps & IErrorContainerDispatchProps;

const mapDispatchToProps: IErrorContainerDispatchProps = {
	setCurrentUser
};

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
		const { history, setCurrentUser } = this.props;
		setCurrentUser(null, null);
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

export default connect(null, mapDispatchToProps)(withRouter(ErrorContainer));
