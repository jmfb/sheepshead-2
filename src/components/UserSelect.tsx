import * as React from 'react';
import { IUser } from '../models/user';
import * as styles from './UserSelect.scss';

interface IUserSelectProps {
	users: IUser[];
	placeholder: string;
	user: IUser | null;
	onSelect: (user: IUser) => void;
}

interface IUserSelectState {
	open: boolean;
	search: string;
}

export default class UserSelect extends React.PureComponent<IUserSelectProps, IUserSelectState> {
	constructor(props: IUserSelectProps) {
		super(props);
		this.state = {
			open: false,
			search: ''
		};
	}

	handleOpen = () => {
		const { users } = this.props;
		this.setState({
			open: true,
			search: ''
		} as IUserSelectState);
	};

	handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		const { users } = this.props;
		this.setState({
			search: value
		} as IUserSelectState);
	};

	handleSelect = (user: IUser) => {
		return () => {
			const { onSelect } = this.props;
			this.setState({
				open: false,
			} as IUserSelectState);
			onSelect(user);
		};
	};

	render() {
		const { placeholder, user, users } = this.props;
		const { open, search } = this.state;
		const topUsers = users === null ? [] : open ?
			users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) >= 0).slice(0, 5) :
			users.slice(0, 5);
		const inputValue = open ? search : user ? user.name : '';

		return(
			<div className={styles.root}>
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
							onChange={this.handleSearch} />
					</span>
				}
				{open && topUsers.map((user, i) => (
					<div key={i} className={styles.user} onClick={this.handleSelect(user)}>{user.name}</div>
				))}
			</div>
		);
	}
}
