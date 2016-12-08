import * as React from 'react';
import { browserHistory } from 'react-router';
import Banner from './components/Banner';
import { getToken } from './api/auth';
import * as queryString from 'query-string';

export default class AuthenticateContainer extends React.PureComponent<void, void> {
	componentDidMount() {
		const { code } = queryString.parse(location.search);
		browserHistory.replace('/authenticate');
		getToken(code).then(token => {
			localStorage.setItem('token', token);
			browserHistory.push('/');
		});
	}

	render() {
		return (
			<div>
				<main>
					<div>
						<Banner type='message' display='Authenticating...' />
					</div>
				</main>
			</div>
		);
	}
}
