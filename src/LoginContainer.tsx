import * as React from 'react';
import { browserHistory } from 'react-router';
import Login from './pages/Login';
import { authenticationService } from './services/AuthenticationService';
import { navigateToAuthenticator, getRefreshToken, getUserInfo } from './api/auth';
import { isValidUser } from './api/users';
import { IRefreshToken, IUserInfo } from './models';

interface ILoginContainerState {
	statusMessage: string;
	signInDisabled: boolean;
	invalidAccount: string;
}

export default class LoginContainer extends React.PureComponent<void, ILoginContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			statusMessage: '',
			signInDisabled: true,
			invalidAccount: ''
		};
	}

	componentDidMount() {
		const refreshToken = localStorage.getItem('refreshToken');
		if (refreshToken == null) {
			this.setState({
				signInDisabled: false
			} as ILoginContainerState);
		} else {
			this.setState({
				statusMessage: 'Refreshing token with Google...'
			} as ILoginContainerState, () => {
				getRefreshToken(refreshToken).then(this.handleToken);
			});
		}
	}

	handleToken = (token: IRefreshToken) => {
		getUserInfo(token.token_type, token.access_token).then(this.handleUserInfo);
	}

	handleUserInfo = (userInfo: IUserInfo) => {
		isValidUser(userInfo.email).then(isValid => {
			if (isValid) {
				authenticationService.setAccount(userInfo.email);
				browserHistory.push('/');
			} else {
				localStorage.removeItem('refreshToken');
				this.setState({
					signInDisabled: false,
					statusMessage: '',
					invalidAccount: userInfo.email
				});
			}
		});
	}

	render() {
		const { statusMessage, signInDisabled, invalidAccount } = this.state;
		return (
			<Login
				{...{statusMessage, signInDisabled, invalidAccount}}
				onClickSignIn={navigateToAuthenticator} />
		);
	}
}
