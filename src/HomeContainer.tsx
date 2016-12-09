import * as React from 'react';
import { browserHistory } from 'react-router';
import Home from './pages/Home';
import { IRole } from './models';

interface IHomeContainerState {
	roleId: IRole;
}

export default class HomeContainer extends React.PureComponent<void, IHomeContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			roleId: +localStorage.getItem('roleId') as IRole
		};
	}

	handleClickCreateGame = () => {
		browserHistory.push('/game/create');
	}

	handleClickLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('roleId');
		browserHistory.push('/login');
	}

	render() {
		const { roleId } = this.state;
		return(
			<Home
				{...{roleId}}
				onClickCreateGame={this.handleClickCreateGame}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
