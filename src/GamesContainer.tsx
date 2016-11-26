import * as React from 'react';
import { hashHistory } from 'react-router';
import GamesView from './pages/GamesView';
import { IGame } from './models';
import { getGames } from './api/games';

interface IGamesContainerState {
	games: IGame[];
	moreGames: boolean;
	loading: boolean;
}

export default class GamesContainer extends React.PureComponent<{}, IGamesContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			games: [],
			moreGames: true,
			loading: false
		};
	}

	componentDidMount() {
		this.setState({ loading: true } as IGamesContainerState);
		getGames(0, 10).then(games => {
			this.setState({
				games: games.games,
				moreGames: games.moreGames,
				loading: false
			});
		});
	}

	handleLoadMoreGames = () => {
		this.setState({ loading: true } as IGamesContainerState);
		const { games } = this.state;
		getGames(games.length, 10).then(newGames => {
			this.setState({
				games: [...games, ...newGames.games],
				moreGames: newGames.moreGames,
				loading: false
			});
		});
	};

	handleClickGame = (id: number) => {
		hashHistory.push(`/game/${id}`);
	};

	render() {
		const { games, moreGames, loading } = this.state;
		return(
			<GamesView
				{...{games, moreGames, loading}}
				onLoadMoreGames={this.handleLoadMoreGames}
				onClickGame={this.handleClickGame} />
		);
	}
}
