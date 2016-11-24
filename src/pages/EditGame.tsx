import * as React from 'react';
import DateButton from '../components/DateButton';
import { IGame } from '../models/game';
import * as styles from './EditGame.scss';

interface IEditGameProps {
	gameId: number | null;
	when: string;
	onEditWhen: (when: string) => void;
}

export default class EditGame extends React.PureComponent<IEditGameProps, any> {
	render() {
		const { gameId } = this.props;
		if (gameId === null) {
			return(
				<div className={styles.banner}>Loading game data...</div>
			);
		}

		const { when, onEditWhen } = this.props;
		return(
			<div className={styles.root}>
				<h1>Game #{gameId}</h1>
				<DateButton
					value={when}
					onChange={onEditWhen} />
				<p>TODO: more</p>
			</div>
		);
	}
}
