import * as React from 'react';
import NavBar from './components/NavBar';

export default class AdminContainer extends React.PureComponent<{}, {}> {
	render() {
		return(
			<div>
				<NavBar />
				<p>This is an admin page.</p>
			</div>
		);
	}
}
