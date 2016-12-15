import * as React from 'react';
import LifetimeView from '~/pages/LifetimeView';
import { IScore } from '~/models';
import { getLifetimeScores } from '~/api/users';

interface ILifetimeContainerState {
	scores: IScore[] | null;
}

export default class LifetimeContainer extends React.PureComponent<void, ILifetimeContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { scores: null };
	}

	componentDidMount() {
		getLifetimeScores().then(scores => {
			this.setState({ scores });
		});
	}

	render() {
		const { scores } = this.state;
		return (
			<LifetimeView {...{scores}} />
		);
	}
}
