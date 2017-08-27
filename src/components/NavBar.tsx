import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { IRole, adminRoleId } from '~/models';
import * as styles from './NavBar.scss';

interface INavBarProps {
	roleId: IRole;
}

export default class NavBar extends React.Component<INavBarProps> {
	render() {
		const { roleId } = this.props;
		return(
			<header>
				<nav>
					<ul className={styles.header}>
						<li><NavLink exact to='/' activeClassName={styles.active}>Home</NavLink></li>
						<li>
							<NavLink to='/leader' activeClassName={styles.active}>
								<span className={styles.large}>Leaderboard</span>
								<span className={styles.small}>Score</span>
							</NavLink>
						</li>
						{roleId === adminRoleId  &&
							<li>
								<NavLink to='/admin' activeClassName={styles.active}>
									<span className={styles.large}>Administration</span>
									<span className={styles.small}>Admin</span>
								</NavLink>
							</li>
						}
					</ul>
				</nav>
			</header>
		);
	}
}
