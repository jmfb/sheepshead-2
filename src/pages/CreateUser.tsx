import * as React from 'react';
import Button from '../components/Button';
import Banner from '../components/Banner';
import * as styles from './CreateUser.scss';

interface ICreateUserProps {
	user: string;
	submitting: boolean;
	created: string | null;
	onUpdateUser: (value: string) => void;
	onClickCreate: () => void;
}

export default class CreateUser extends React.PureComponent<ICreateUserProps, {}> {
	handleUpdateUser = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateUser } = this.props;
		const { value } = e.currentTarget;
		onUpdateUser(value);
	};

	render() {
		const { user, submitting, created, onClickCreate } = this.props;
		return(
			<div className={styles.root}>
				<h1 className={styles.title}>Create User</h1>
				<div className={styles.label}>Name:</div>
				<input
					className={styles.input}
					type='text'
					value={user}
					autoFocus
					placeholder='e.g. John Doe'
					onChange={this.handleUpdateUser} />
				<div className={styles.bottom}>
					{user !== '' && !submitting &&
						<Button type='primary' display='Submit' onClick={onClickCreate} />
					}
					{submitting &&
						<Banner type='message' display={`Creating ${created}...`} />
					}
					{!submitting && created !== null &&
						<Banner type='message' display={`Created ${created}.`} />
					}
					{!submitting && user === '' &&
						<Banner type='error' display='Enter a valid user.' />
					}
				</div>
			</div>
		);
	}
}
