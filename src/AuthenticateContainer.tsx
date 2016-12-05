import * as React from 'react';
import { browserHistory } from 'react-router';
import Banner from './components/Banner';
import SignInButton from './components/SignInButton';
import { getToken, getAuthenticationUrl } from './api/auth';
import * as queryString from 'query-string';

interface IAuthenticationContainerState {
	errorMessage: string;
}

export default class AuthenticateContainer extends React.PureComponent<void, IAuthenticationContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { errorMessage: '' };
	}

	componentDidMount() {
		const { code } = queryString.parse(location.search);
		browserHistory.replace('/authenticate');
		getToken(code).then(token => {
			localStorage.setItem('token', token);
			browserHistory.push('/');
		}).catch(() => {
			// TODO: look into where the exception is being hidden, reason is {} at this point.
			this.setState({ errorMessage: 'Your Google account is not valid for Sheepshead.' });
		});
	}

	handleClickSignIn = () => {
		this.setState({ errorMessage: '' });
		getAuthenticationUrl().then(url => {
			window.location.href = url;
		});
	}

	render() {
		const { errorMessage } = this.state;
		return errorMessage ?
			this.renderError() :
			<Banner type='message' display='Authenticating...' />;
	}

	renderError = () => {
		const { errorMessage } = this.state;
		return (
			<div>
				<Banner type='error' display={errorMessage} />
				<Banner type='message' display='Please contact Jacob Buysse to create your account.' />
				<p>Please sign in with your directs.com Google account.</p>
				<SignInButton style='dark' disabled={false} onClick={this.handleClickSignIn} />
			</div>
		);
	}
}
