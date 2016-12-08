import * as React from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Banner from '../components/Banner';
import DateDisplay from '../components/DateDisplay';
import { IRole, roleNames } from '../models';
import * as styles from './EditUser.scss';
import * as cx from 'classnames';

interface IEditUserProps {
	name: string;
	roleId: IRole;
	totalGameCount: number;
	lifetimeScore: number;
	lastGameWhen: string | null;
	accounts: string[];
	onUpdateName: (value: string) => void;
	onUpdateRole: (value: IRole) => void;
	onUpdateAccount: (index: number, value: string) => void;
	onAddAccount: () => void;
	onClickSubmit: () => void;
	onClickDelete: () => void;
	submitting: boolean;
}

export default class EditUser extends React.PureComponent<IEditUserProps, void> {
	handleUpdateRole = (e: React.FormEvent<HTMLSelectElement>) => {
		const { onUpdateRole } = this.props;
		onUpdateRole(+e.currentTarget.value as IRole);
	}

	handleUpdateAccount = (index: number) => {
		const { onUpdateAccount } = this.props;
		return (value: string) => {
			onUpdateAccount(index, value);
		};
	}

	render() {
		const {
			name,
			roleId,
			accounts,
			totalGameCount,
			lifetimeScore,
			lastGameWhen,
			onUpdateName,
			onAddAccount,
			onClickSubmit,
			onClickDelete,
			submitting
		} = this.props;
		return (
			<div className={styles.root}>
				<div className={styles.card}>
					<h1 className={styles.title}>Edit User</h1>
					<div className={styles.form}>
						<div className={styles.row}>
							<TextInput
								label='Name'
								value={name}
								placeholder='e.g. John Doe'
								autoFocus
								onChange={onUpdateName} />
							<div className={styles.row}>
								<div className={styles.label}>Role:</div>
								<select className={styles.dropdown} value={roleId} onChange={this.handleUpdateRole}>
									{roleNames.map((roleName, i) => (
										<option key={i} value={i}>{roleName}</option>
									))}
								</select>
							</div>
							{accounts.map((account, i) => (
								<TextInput
									key={i}
									label={`Account ${i + 1}`}
									value={account}
									placeholder='e.g. jdoe@example.com'
									onChange={this.handleUpdateAccount(i)} />
							))}
							<div className={styles.buttons}>
								<Button type='secondary' display='Add Account' onClick={onAddAccount} />
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Total Games Played:</div>
								<div className={styles.count}>{totalGameCount}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Lifetime Score:</div>
								<div className={cx(styles.score, { [styles.negative]: lifetimeScore < 0 })}>{lifetimeScore}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Last Game:</div>
								<div className={styles.label}>
									{lastGameWhen ?
										<DateDisplay value={lastGameWhen} /> :
										'Never'
									}
								</div>
							</div>
							<div className={styles.buttons}>
								{!submitting &&
									<Button type='primary' display='Submit' onClick={onClickSubmit} />
								}
								{!submitting && totalGameCount === 0 &&
									<Button type='danger' display='Delete' onClick={onClickDelete} />
								}
								{submitting &&
									<Banner type='message' display='Submitting changes...' />
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
