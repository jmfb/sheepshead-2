import * as React from 'react';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Game from '../components/Game';
import { IGame } from '../models';
import * as styles from './GamesView.scss';

interface IGamesViewProps {
	games: IGame[];
	moreGames: boolean;
	loading: boolean;
	onLoadMoreGames: () => void;
	onClickGame: (id: number) => void;
}

export default class GamesView extends React.PureComponent<IGamesViewProps, void> {
	handleClickGame = (id: number) => {
		const { onClickGame } = this.props;
		return () => {
			onClickGame(id);
		};
	}

	render() {
		const { games, moreGames, loading, onLoadMoreGames } = this.props;
		return(
			<div>
				{games.map((game, i) => (
					<Game key={i} game={game} onClick={this.handleClickGame(game.id)} />
				))}
				<div className={styles.bottom}>
					{loading &&
						<Banner type='message' display='Loading more games...' />
					}
					{moreGames && !loading &&
						<Button type='primary' display='Load More' onClick={onLoadMoreGames} />
					}
				</div>
			</div>
		);
	}
}
