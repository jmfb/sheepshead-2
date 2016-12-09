import * as React from 'react';
import NavBar from './components/NavBar';
import { IRole } from './models';

interface IApplicationContainerState {
	roleId: IRole;
}

export default class ApplicationContainer extends React.PureComponent<void, IApplicationContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { roleId: +localStorage.getItem('roleId') as IRole };
	}

	render() {
		const { roleId } = this.state;
		return(
			<div>
				<NavBar {...{roleId}} />
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}
