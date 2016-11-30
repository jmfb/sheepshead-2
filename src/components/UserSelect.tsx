import * as React from 'react';
import { IUser } from '../models';
import * as styles from './UserSelect.scss';
import * as cx from 'classnames';

interface IUserSelectProps {
	className?: string;
	users: IUser[];
	placeholder: string;
	user: IUser | null;
	onSelect: (user: IUser) => void;
}

interface IUserSelectState {
	open: boolean;
	search: string;
	selection: number;
}

export default class UserSelect extends React.PureComponent<IUserSelectProps, IUserSelectState> {
	constructor(props: IUserSelectProps) {
		super(props);
		this.state = {
			open: false,
			search: '',
			selection: 0
		};
	}

	handleOpen = () => {
		this.setState({
			open: true,
			search: '',
			selection: 0
		} as IUserSelectState);
	}

	handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		this.setState({
			search: value,
			selection: 0
		} as IUserSelectState);
	}

	handleSelect = (user: IUser) => {
		return () => {
			const { onSelect } = this.props;
			this.setState({
				open: false
			} as IUserSelectState);
			onSelect(user);
		};
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.keyCode) {
			case 13: {
				this.handleEnter();
			} break;

			case 27: {
				this.handleEscape();
			} break;

			case 38: {
				this.handleUpArrow();
			} break;

			case 40: {
				this.handleDownArrow();
			} break;
		}
	}

	handleEnter = () => {
		const topUsers = this.getTopUsers();
		if (topUsers.length > 0) {
			this.handleSelect(topUsers[this.getSelectedIndex(topUsers.length)])();
		}
	}

	handleEscape = () => {
		this.setState({ open: false } as IUserSelectState);
	}

	handleUpArrow = () => {
		const { selection } = this.state;
		this.setState({ selection: selection - 1 } as IUserSelectState);
	}

	handleDownArrow = () => {
		const { selection } = this.state;
		this.setState({ selection: selection + 1 } as IUserSelectState);
	}

	getTopUsers = () => {
		const { users } = this.props;
		const { open, search } = this.state;
		return users === null ? [] : open ?
			users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) >= 0).slice(0, 5) :
			users.slice(0, 5);
	}

	getSelectedIndex = (count: number) => {
		const { selection } = this.state;
		return (((selection % count) + count) % count);
	}

	render() {
		const { className, placeholder, user } = this.props;
		const { open, search } = this.state;
		const topUsers = this.getTopUsers();
		const selectedIndex = this.getSelectedIndex(topUsers.length);
		const inputValue = open ? search : user ? user.name : '';

		return(
			<div className={cx(styles.root, className)}>
				{!open && user === null &&
					<div className={styles.placeholder} onClick={this.handleOpen}>{placeholder}</div>
				}
				{!open && user !== null &&
					<div className={styles.user} onClick={this.handleOpen}>{user.name}</div>
				}
				{open &&
					<span className={styles.searchWrapper}>
						<input
							className={styles.search}
							type='text'
							placeholder={placeholder}
							value={inputValue}
							autoFocus
							onChange={this.handleSearch}
							onKeyDown={this.handleKeyDown} />
					</span>
				}
				{open &&
					<div className={styles.users}>
						{topUsers.map((user, i) => (
							<div
								key={i}
								className={cx(styles.user, { [styles.selected]: i === selectedIndex })}
								onClick={this.handleSelect(user)}>
								{user.name}
							</div>
						))}
					</div>
				}
			</div>
		);
	}
}
