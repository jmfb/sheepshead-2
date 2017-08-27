import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './LeaderboardSelect.scss';

interface ILeaderboardSelectProps {
	year: number;
	month: string;
}

export default class LeaderboardSelect extends React.PureComponent<ILeaderboardSelectProps> {
	render() {
		const { year, month } = this.props;
		return (
			<ul className={styles.root}>
				<li><NavLink to='/leader' activeClassName={styles.active}>Current</NavLink></li>
				<li><NavLink to={`/leader/${year}/${month}`} activeClassName={styles.active}>Month</NavLink></li>
				<li><NavLink to={`/leader/${year}`} activeClassName={styles.active}>Year</NavLink></li>
				<li><NavLink to='/leader/lifetime' activeClassName={styles.active}>Lifetime</NavLink></li>
				<li><NavLink to='/leader/games' activeClassName={styles.active}>Games</NavLink></li>
			</ul>
		);
	}
}
