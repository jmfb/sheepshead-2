import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import * as styles from './NavBar.scss';

export default class NavBar extends React.PureComponent<{}, {}> {
	render() {
		return(
			<header>
				<nav>
					<ul className={styles.header}>
						<li><IndexLink to='/' activeClassName={styles.active}>Home</IndexLink></li>
						<li>
							<Link to='/leader' activeClassName={styles.active}>
								<span className={styles.large}>Leaderboard</span>
								<span className={styles.small}>Scores</span>
							</Link>
						</li>
						<li>
							<Link to='/admin' activeClassName={styles.active}>
								<span className={styles.large}>Administration</span>
								<span className={styles.small}>Admin</span>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
};
