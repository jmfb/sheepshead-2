import * as React from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';
import Banner from '~/components/Banner';
import { login } from '~/api/auth';
import * as queryString from 'query-string';

interface IAuthenticateContainerProps {
	history: History;
}

class AuthenticateContainer extends React.PureComponent<IAuthenticateContainerProps> {
	componentDidMount() {
		const { history } = this.props;
		const { code } = queryString.parse(location.search);
		history.replace('/authenticate');
		login(code).then(loginModel => {
			localStorage.setItem('token', loginModel.token);
			localStorage.setItem('roleId', loginModel.roleId.toString());
			history.push('/');
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

export default withRouter(AuthenticateContainer);
