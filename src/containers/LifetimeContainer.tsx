import * as React from 'react';
import LifetimeView from '~/pages/LifetimeView';
import { IScore } from '~/models';
import { getLifetimeScores } from '~/api/scores';

interface ILifetimeContainerState {
	scores: IScore[] | null;
}

export default class LifetimeContainer extends React.PureComponent<{}, ILifetimeContainerState> {
	constructor(props: {}) {
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
