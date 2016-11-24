import * as React from 'react';
import { IGame } from '../models/game';
import * as moment from 'moment';
import * as styles from './ViewGame.scss';
import { sum } from 'lodash';

interface IViewGameProps {
	game: IGame | null;
	deleted: boolean;
	submitting: boolean;
	onEdit: () => void;
	onDelete: () => void;
	onUndoDelete: () => void;
}

export default class ViewGame extends React.PureComponent<IViewGameProps, {}> {
	render() {
		const { game } = this.props;
		if (game === null) {
			return(
				<div className={styles.banner}>Loading game data...</div>
			);
		}

		const { deleted, submitting, onEdit, onDelete, onUndoDelete } = this.props;
		const { id, when, scores } = game;
		const whenDisplay = moment(when).utc().format('dddd, MMMM Do YYYY');
		const pointSpread = sum(scores
			.filter(score => score.score > 0)
			.map(score => score.score));
		return(
			<div className={styles.root}>
				<h1>Game #{game.id}</h1>
				<div className={styles.when}>{whenDisplay}</div>
				<div className={styles.scores}>
					{scores.map((score, i) => (
						<div key={i} className={styles.row}>
							<div className={styles.user}>{score.user}</div>
							<div className={styles.score}>{score.score}</div>
						</div>
					))}
				</div>
				<div className={styles.pointSpread}>P.S. {pointSpread}</div>
				{submitting && deleted &&
					<div className={styles.banner}>Resubmitting game...</div>
				}
				{submitting && !deleted &&
					<div className={styles.banner}>Deleting game...</div>
				}
				{!submitting && deleted &&
					<div>
						<div className={styles.banner}>Successfully deleted game.</div>
						<button className={styles.edit} onClick={onUndoDelete}>Undo</button>
					</div>
				}
				{!submitting && !deleted &&
					<div>
						<button className={styles.edit} onClick={onEdit}>Edit</button>
						<button className={styles.delete} onClick={onDelete}>Delete</button>
					</div>
				}
			</div>
		);
	}
}
