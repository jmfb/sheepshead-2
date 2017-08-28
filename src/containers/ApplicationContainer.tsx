import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '~/components/NavBar';
import HomeContainer from '~/containers/HomeContainer';
import LeaderContainer from '~/containers/LeaderContainer';
import AdminRootContainer from '~/containers/AdminRootContainer';
import GameRootContainer from '~/containers/GameRootContainer';
import { IState } from '~/reducers';
import { IRole } from '~/models';

interface IApplicationContainerProps {
	roleId: IRole | null;
	token: string | null;
}

function mapStateToProps(state: IState): IApplicationContainerProps {
	const { currentUser } = state;
	const { roleId, token } = currentUser;
	return { roleId, token };
}

class ApplicationContainer extends React.PureComponent<IApplicationContainerProps> {
	render() {
		const { roleId, token } = this.props;
		if (roleId == null || token == null) {
			return (
				<Redirect to='/login' />
			);
		}
		return (
			<div>
				<NavBar {...{roleId}} />
				<main>
					<Switch>
						<Route exact path='/' component={HomeContainer} />
						<Route path='/leader' component={LeaderContainer} />
						<Route path='/admin' component={AdminRootContainer} />
						<Route path='/game' component={GameRootContainer} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default connect(mapStateToProps)(ApplicationContainer);
