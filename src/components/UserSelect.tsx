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
	users: IUser[];
}

export default class UserSelect extends React.PureComponent<IUserSelectProps, IUserSelectState> {
	constructor(props: IUserSelectProps) {
		super(props);
		this.state = {
			open: false,
			search: '',
			users: []
		};
	}

	handleOpen = () => {
		const { users } = this.props;
		this.setState({
			open: true,
			search: '',
			users: users.slice(0, 5)
		} as IUserSelectState);
	};

	handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		const { users } = this.props;
		this.setState({
			search: value,
			users: users.filter(user => user.name.toLowerCase().indexOf(value.toLowerCase()) >= 0).slice(0, 5)
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
		const { placeholder, user } = this.props;
		const { open, search, users } = this.state;
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
				{open && users.map((user, i) => (
					<div key={i} className={styles.user} onClick={this.handleSelect(user)}>{user.name}</div>
				))}
			</div>
		);
	}
}
