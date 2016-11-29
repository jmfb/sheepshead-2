import * as React from 'react';
import NavBar from './components/NavBar';

export default class ApplicationContainer extends React.PureComponent<{}, {}> {
	render() {
		return(
			<div>
				<NavBar />
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}
