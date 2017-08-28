import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { History } from 'history';
import Banner from '~/components/Banner';
import { login } from '~/api/auth';
import { setCurrentUser } from '~/actions';
import { IRole } from '~/models';
import * as queryString from 'query-string';

interface IAuthenticateContainerOwnProps {
	history: History;
}

interface IAuthenticateContainerDispatchProps {
	setCurrentUser: (roleId: IRole | null, token: string | null) => void;
}

const mapDispatchToProps: IAuthenticateContainerDispatchProps = {
	setCurrentUser
};

type IAuthenticateContainerProps = IAuthenticateContainerOwnProps & IAuthenticateContainerDispatchProps;

class AuthenticateContainer extends React.PureComponent<IAuthenticateContainerProps> {
	componentDidMount() {
		const { history, setCurrentUser } = this.props;
		const { code } = queryString.parse(location.search);
		history.replace('/authenticate');
		login(code).then(loginModel => {
			setCurrentUser(loginModel.roleId as IRole, loginModel.token);
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

export default connect(null, mapDispatchToProps)(withRouter(AuthenticateContainer));
