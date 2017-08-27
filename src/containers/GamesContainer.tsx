import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import GamesView from '~/pages/GamesView';
import { IGame } from '~/models';
import { getGames } from '~/api/games';

interface IGamesContainerProps {
	history: History;
}

interface IGamesContainerState {
	games: IGame[];
	moreGames: boolean;
	loading: boolean;
}

class GamesContainer extends React.PureComponent<IGamesContainerProps, IGamesContainerState> {
	constructor(props: IGamesContainerProps) {
		super(props);
		this.state = {
			games: [],
			moreGames: true,
			loading: false
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		getGames(0, 10).then(games => {
			this.setState({
				games: games.games,
				moreGames: games.moreGames,
				loading: false
			});
		});
	}

	handleLoadMoreGames = () => {
		this.setState({ loading: true });
		const { games } = this.state;
		getGames(games.length, 10).then(newGames => {
			this.setState({
				games: [...games, ...newGames.games],
				moreGames: newGames.moreGames,
				loading: false
			});
		});
	}

	handleClickGame = (id: number) => {
		const { history } = this.props;
		history.push(`/game/view/${id}`);
	}

	render() {
		const { games, moreGames, loading } = this.state;
		return (
			<GamesView
				{...{games, moreGames, loading}}
				onLoadMoreGames={this.handleLoadMoreGames}
				onClickGame={this.handleClickGame}
				/>
		);
	}
}

export default withRouter(GamesContainer);
