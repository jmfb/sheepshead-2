import * as React from 'react';
import Banner from '~/components/Banner';
import Payout from '~/components/Payout';
import { IMonth, IScore, IAllUserData } from '~/models';
import * as moment from 'moment';
import * as styles from './PayoutsView.scss';

interface IPayoutsViewProps {
	month: IMonth;
	scores: IScore[] | null;
	users: IAllUserData[] | null;
}

export default class PayoutsView extends React.PureComponent<IPayoutsViewProps, void> {
	render() {
		const { scores } = this.props;
		return(
			<div className={styles.root}>
				<div className={styles.title}>{this.getPeriodDescription()}</div>
				{scores === null ?
					<Banner type='message' display='Loading scores...' /> :
					this.renderScores()
				}
			</div>
		);
	}

	getPeriodDescription = () => {
		const { month } = this.props;
		const period = moment(`${month.month} 1 ${month.year}`, 'MMMM d YYYY');
		return period.format('[Sheepshead - ]MMM[. \']YY');
	}

	isWorkAccount = (account: string) => {
		return account.match(/(directs|directsupply|tels|dssi)\.(net|com)/i) !== null;
	}

	getPersonalAccountBeforeWorkAccount = (accounts: string[]) => {
		return accounts.sort((left, right) => {
			const leftIsWork = this.isWorkAccount(left);
			const rightIsWork = this.isWorkAccount(right);
			if (leftIsWork === rightIsWork) {
				return left.localeCompare(right);
			}
			return leftIsWork ? 1 : -1;
		})[0];
	}

	getPlayerEmail = (name: string) => {
		const { users } = this.props;
		if (users === null) {
			return name;
		}
		const user = users.find(user => user.name === name);
		if (!user || user.accounts.length === 0) {
			return name;
		}
		if (user.accounts.length === 1) {
			return user.accounts[0];
		}
		return this.getPersonalAccountBeforeWorkAccount(user.accounts);
	}

	renderScores = () => {
		const { scores } = this.props;
		const winners = scores.filter(score => score.score > 0).sort((a, b) => b.score - a.score);
		const losers = scores.filter(score => score.score < 0).sort((a, b) => a.score - b.score);
		return (
			<div>
				<div className={styles.section}>Request money from the losers</div>
				{losers.map((score, i) => (
					<Payout key={i} name={this.getPlayerEmail(score.user)} score={score.score} />
				))}
				<div className={styles.section}>Send money to the winners</div>
				{winners.map((score, i) => (
					<Payout key={i} name={this.getPlayerEmail(score.user)} score={score.score} />
				))}
			</div>
		);
	}
}
