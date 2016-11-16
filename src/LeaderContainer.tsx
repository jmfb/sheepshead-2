import * as React from 'react';
import NavBar from './components/NavBar';

export default class LeaderContainer extends React.PureComponent<{}, {}> {
	render() {
		return(
			<div>
				<NavBar />
				<p>This is a leaderboard.</p>
			</div>
		);
	}
}
