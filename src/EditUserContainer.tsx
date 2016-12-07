import * as React from 'react';
import { browserHistory } from 'react-router';
import { IAllUserData } from './models';

interface IEditUserContainerState {
	user: IAllUserData;
}

export default class EditUserContainer extends React.PureComponent<void, IEditUserContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { user: browserHistory.getCurrentLocation().state as IAllUserData };
	}

	render() {
		const { user } = this.state;
		return (
			<div>Edit user: {user.name}</div>
		);
	}
}
