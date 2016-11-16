import * as React from 'react';
import NavBar from './components/NavBar';

export default class HomeContainer extends React.PureComponent<{}, {}> {
	render() {
		return(
			<div>
				<NavBar />
				<p>This is a home page.</p>
			</div>
		);
	}
}
