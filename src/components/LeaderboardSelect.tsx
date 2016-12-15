import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import * as styles from './LeaderboardSelect.scss';

interface ILeaderboardSelectProps {
	year: number;
	month: string;
}

export default class LeaderboardSelect extends React.PureComponent<ILeaderboardSelectProps, void> {
	render() {
		const { year, month } = this.props;
		return (
			<ul className={styles.root}>
				<li><IndexLink to='/leader' activeClassName={styles.active}>Current</IndexLink></li>
				<li><Link to={`/leader/${year}/${month}`} activeClassName={styles.active}>Month</Link></li>
				<li><Link to={`/leader/${year}`} activeClassName={styles.active}>Year</Link></li>
				<li><Link to='/leader/lifetime' activeClassName={styles.active}>Lifetime</Link></li>
				<li><Link to='/leader/games' activeClassName={styles.active}>Games</Link></li>
			</ul>
		);
	}
}
