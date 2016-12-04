import * as React from 'react';
import { browserHistory } from 'react-router';
import Banner from './components/Banner';
import SignInButton from './components/SignInButton';
import { getToken, getUserInfo, navigateToAuthenticator } from './api/auth';
import { isValidUser } from './api/users';
import { IToken, IUserInfo } from './models';
import { authenticationService } from './services/AuthenticationService';
import * as queryString from 'query-string';

interface IAuthenticationContainerState {
	invalidAccount: string;
}

export default class AuthenticateContainer extends React.PureComponent<void, IAuthenticationContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { invalidAccount: '' };
	}

	componentDidMount() {
		const { code } = queryString.parse(location.search);
		console.log('authenticate container', 'code', code);
		browserHistory.replace('/authenticate');
		getToken(code).then(this.handleToken);
	}

	handleToken = (token: IToken) => {
		localStorage.setItem('refreshToken', token.refresh_token);
		getUserInfo(token.token_type, token.access_token).then(this.handleUserInfo);
	}

	handleUserInfo = (userInfo: IUserInfo) => {
		isValidUser(userInfo.email).then(isValid => {
			if (isValid) {
				authenticationService.setAccount(userInfo.email);
				browserHistory.push('/');
			} else {
				localStorage.removeItem('refreshToken');
				this.setState({ invalidAccount: userInfo.email });
			}
		});
	}

	render() {
		const { invalidAccount } = this.state;
		return invalidAccount ?
			this.renderInvalidAccount() :
			<Banner type='message' display='Authenticating...' />;
	}

	renderInvalidAccount = () => {
		const { invalidAccount } = this.state;
		return (
			<div>
				<Banner type='error' display={`${invalidAccount} is not a valid account.  Please contact Jacob Buysse.`} />
				<SignInButton style='dark' disabled={false} onClick={navigateToAuthenticator} />
			</div>
		);
	}
}
