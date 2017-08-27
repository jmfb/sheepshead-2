import * as React from 'react';
import Button from '~/components/Button';
import PointSpread from '~/components/PointSpread';
import Banner from '~/components/Banner';
import DateDisplay from '~/components/DateDisplay';
import ScoresTile from '~/components/ScoresTile';
import { IGame, IRole, playerRoleId } from '~/models';
import * as styles from './ViewGame.scss';

interface IViewGameProps {
	roleId: IRole;
	game: IGame | null;
	deleted: boolean;
	submitting: boolean;
	onEdit: () => void;
	onDelete: () => void;
	onUndoDelete: () => void;
}

export default class ViewGame extends React.PureComponent<IViewGameProps> {
	render() {
		const { game } = this.props;
		if (game === null) {
			return(
				<Banner type='message' display='Loading game data...' />
			);
		}

		const { roleId, deleted, submitting, onEdit, onDelete, onUndoDelete } = this.props;
		const { when, scores } = game;
		return(
			<div className={styles.root}>
				<h1 className={styles.title}>Game #{game.id}</h1>
				<DateDisplay value={when} />
				<ScoresTile scores={scores} />
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
				{roleId >= playerRoleId && !submitting && !deleted &&
					<div className={styles.buttons}>
						<Button display='Edit' type='primary' onClick={onEdit} />
						<Button display='Delete' type='danger' onClick={onDelete} />
					</div>
				}
			</div>
		);
	}
}
