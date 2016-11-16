import * as React from 'react';
import NavBar from './components/NavBar';

interface IScoresContainerProps {
	navigationSelection: string;
}

interface IScoresContainerState {
	navigationSelection: string;
}

export default class ScoresContainer extends React.PureComponent<IScoresContainerProps, IScoresContainerState> {
	constructor(props: IScoresContainerProps) {
		super(props);
		const { navigationSelection } = props;
		this.state = { navigationSelection };
	}

	handleSelectNavigationItem = (value: string) => {
		this.setState({ navigationSelection: value });
	};

	render() {
		const { navigationSelection } = this.state;
		return(
			<NavBar selection={navigationSelection} onSelectItem={this.handleSelectNavigationItem} />
		);
	}
}
