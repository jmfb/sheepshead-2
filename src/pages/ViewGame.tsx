import * as React from 'react';
import Button from '../components/Button';
import PointSpread from '../components/PointSpread';
import Banner from '../components/Banner';
import DateDisplay from '../components/DateDisplay';
import { IGame } from '../models/game';
import * as styles from './ViewGame.scss';

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
				<Banner type='message' display='Loading game data...' />
			);
		}

		const { deleted, submitting, onEdit, onDelete, onUndoDelete } = this.props;
		const { id, when, scores } = game;
		return(
			<div className={styles.root}>
				<h1>Game #{game.id}</h1>
				<DateDisplay value={when} />
				<div className={styles.scores}>
					{scores.map((score, i) => (
						<div key={i} className={styles.row}>
							<div className={styles.user}>{score.user}</div>
							<div className={styles.score}>{score.score}</div>
						</div>
					))}
				</div>
				<PointSpread scores={scores} />
				{submitting && deleted &&
					<Banner type='message' display='Resubmitting game...' />
				}
				{submitting && !deleted &&
					<Banner type='message' display='Deleting game...' />
				}
				{!submitting && deleted &&
					<div>
						<Banner type='message' display='Successfully deleted game.' />
						<Button display='Undo' type='primary' onClick={onUndoDelete} />
					</div>
				}
				{!submitting && !deleted &&
					<div className={styles.buttons}>
						<Button display='Edit' type='primary' onClick={onEdit} />
						<Button display='Delete' type='transaction' onClick={onDelete} />
					</div>
				}
			</div>
		);
	}
}
