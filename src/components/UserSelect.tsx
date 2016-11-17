import * as React from 'react';
import { IUser } from '../models/user';

interface IUserSelectProps {
	users: IUser[];
	placeholder: string;
	onSelect: (user: IUser) => void;
}

interface IUserSelectState {
	open: boolean;
	search: string;
	user: IUser | null;
	users: IUser[];
}

export default class UserSelect extends React.PureComponent<IUserSelectProps, IUserSelectState> {
	constructor(props: IUserSelectProps) {
		super(props);
		this.state = {
			open: false,
			search: '',
			user: null,
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
			users: users.filter(user => user.name.toLowerCase().indexOf(value) >= 0).slice(0, 5)
		} as IUserSelectState);
	};

	handleSelect = (user: IUser) => {
		return () => {
			const { onSelect } = this.props;
			this.setState({
				open: false,
				user
			} as IUserSelectState);
			onSelect(user);
		};
	};

	render() {
		const { placeholder } = this.props;
		const { open, search, user, users } = this.state;
		const inputValue = open ? search : user ? user.name : '';
		return(
			<div>
				{!open && user === null &&
					<div onClick={this.handleOpen}>{placeholder}</div>
				}
				{!open && user !== null &&
					<div onClick={this.handleOpen}>{user.name}</div>
				}
				{open &&
					<input
						type='text'
						placeholder={placeholder}
						value={inputValue}
						autoFocus
						onChange={this.handleSearch} />
				}
				{open && users.map((user, i) => (
					<div key={i} onClick={this.handleSelect(user)}>{user.name}</div>
				))}
			</div>
		);
	}
}
