import * as React from 'react';
import Button from '../components/Button';
import Banner from '../components/Banner';
import * as styles from './CreateUser.scss';

interface ICreateUserProps {
	user: string;
	account: string;
	submitting: boolean;
	created: string | null;
	onUpdateUser: (value: string) => void;
	onUpdateAccount: (value: string) => void;
	onClickCreate: () => void;
}

export default class CreateUser extends React.PureComponent<ICreateUserProps, void> {
	handleUpdateUser = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateUser } = this.props;
		const { value } = e.currentTarget;
		onUpdateUser(value);
	}

	handleUpdateAccount = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateAccount } = this.props;
		const { value } = e.currentTarget;
		onUpdateAccount(value);
	}

	render() {
		const { user, account, submitting, created, onClickCreate } = this.props;
		return(
			<div>
				<div className={styles.card}>
					<h1 className={styles.title}>Create User</h1>
					<div className={styles.form}>
						<div className={styles.row}>
							<div className={styles.label}>Name:</div>
							<input
								className={styles.input}
								type='text'
								value={user}
								autoFocus
								placeholder='e.g. John Doe'
								onChange={this.handleUpdateUser} />
						</div>
						<div className={styles.row}>
							<div className={styles.label}>Account:</div>
							<input
								className={styles.input}
								type='text'
								value={account}
								placeholder='e.g. jdoe'
								onChange={this.handleUpdateAccount} />
						</div>
					</div>
					{!submitting && (
						<div className={styles.spacer}>
							<Button type='primary' display='Submit' onClick={onClickCreate} />
						</div>
					)}
				</div>
				<div className={styles.spacer}>
					{submitting &&
						<Banner type='message' display={`Creating ${created}...`} />
					}
					{!submitting && created !== null &&
						<Banner type='message' display={`Created ${created}.`} />
					}
				</div>
			</div>
		);
	}
}
