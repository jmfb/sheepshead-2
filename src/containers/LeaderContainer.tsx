import * as React from 'react';
import { browserHistory } from 'react-router';
import Button from '~/components/Button';
import * as moment from 'moment';

export default class LeaderContainer extends React.PureComponent<void, void> {
	handleClickCurrent = () => {
		browserHistory.push('/leader');
	}

	handleClickMonth = () => {
		const now = moment();
		browserHistory.push(`/leader/${now.year()}/${now.format('MMMM')}`);
	}

	handleClickYear = () => {
		const now = moment();
		browserHistory.push(`/leader/${now.year()}`);
	}

	handleClickLifetime = () => {
		browserHistory.push('/leader/lifetime');
	}

	handleClickGames = () => {
		browserHistory.push('/leader/games');
	}

	render() {
		const { children } = this.props;
		return (
			<div>
				<Button type='primary' display='Current' onClick={this.handleClickCurrent} />
				<Button type='primary' display='Month' onClick={this.handleClickMonth} />
				<Button type='primary' display='Year' onClick={this.handleClickYear} />
				<Button type='primary' display='Lifetime' onClick={this.handleClickLifetime} />
				<Button type='primary' display='Games' onClick={this.handleClickGames} />
				{children}
			</div>
		);
	}
}
