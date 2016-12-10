import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import TextInput from '~/components/TextInput';
import * as styles from './CreateUser.scss';

interface ICreateUserProps {
	user: string;
	account: string;
	submitting: boolean;
	onUpdateUser: (value: string) => void;
	onUpdateAccount: (value: string) => void;
	onClickCreate: () => void;
}

export default class CreateUser extends React.PureComponent<ICreateUserProps, void> {
	render() {
		const { user, account, submitting, onUpdateUser, onUpdateAccount, onClickCreate } = this.props;
		return(
			<div>
				<div className={styles.card}>
					<h1 className={styles.title}>Create User</h1>
					<div className={styles.form}>
						<TextInput
							label='Name'
							value={user}
							placeholder='e.g. John Doe'
							autoFocus
							maxLength={30}
							onChange={onUpdateUser} />
						<TextInput
							label='Account'
							value={account}
							placeholder='e.g. jdoe@example.com'
							maxLength={100}
							onChange={onUpdateAccount} />
					</div>
					{!submitting && (
						<div className={styles.spacer}>
							<Button type='primary' display='Submit' onClick={onClickCreate} />
						</div>
					)}
				</div>
				<div className={styles.spacer}>
					{submitting &&
						<Banner type='message' display='Submitting user...' />
					}
				</div>
			</div>
		);
	}
}
