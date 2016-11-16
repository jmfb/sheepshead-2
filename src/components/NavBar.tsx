import * as React from 'react';
import * as styles from './NavBar.scss';

interface INavBarProps {
	selection: string;
	onSelectItem: (value: string) => void;
}

const items = ['Home', 'Leaderboards', 'Administration'];

export default class NavBar extends React.PureComponent<INavBarProps, {}> {
	handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const { selection, onSelectItem } = this.props;
		const newSelection = e.currentTarget.text;
		if (newSelection !== selection) {
			onSelectItem(newSelection);
		}
	};

	render() {
		const { selection, onSelectItem } = this.props;
		return(
			<header>
				<nav>
					<ul className={styles.header}>
						{items.map((item, i) => (
							<li key={i}>
								<a className={item === selection ? styles.active : null}
									onClick={this.handleClick}>{item}</a>
							</li>
						))}
					</ul>
				</nav>
			</header>
		);
	}
};
