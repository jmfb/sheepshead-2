import * as React from 'react';
import UploadGames from './pages/UploadGames';
import { IGameReport, IGame } from './models';
import { updateGame } from './api/games';

interface IUploadGamesContainerState {
	games: IGame[];
	pendingFileCount: number;
	submitting: boolean;
}

export default class UploadGamesContainer extends React.PureComponent<{}, IUploadGamesContainerState> {
	fileReader: FileReader;
	pendingFiles: File[];

	constructor(props: any) {
		super(props);
		this.state = {
			games: [],
			pendingFileCount: 0,
			submitting: false
		};
		this.fileReader = new FileReader();
		this.pendingFiles = [];
	}

	componentDidMount() {
		this.fileReader.onload = () => {
			const { result } = this.fileReader;
			const report = JSON.parse(result) as IGameReport;
			this.loadGames(report);
			this.pendingFiles.splice(0, 1);
			this.setState({
				pendingFileCount: this.pendingFiles.length
			} as IUploadGamesContainerState);
			if (this.pendingFiles.length > 0) {
				this.fileReader.readAsText(this.pendingFiles[0]);
			}
		};
	}

	componentWillUnmount() {
		this.fileReader.onload = null;
	}

	handleChooseFile = (file: File) => {
		this.pendingFiles.push(file);
		this.setState({
			pendingFileCount: this.pendingFiles.length
		} as IUploadGamesContainerState);
		if (this.fileReader.readyState !== this.fileReader.LOADING) {
			console.log('loading file');
			this.fileReader.readAsText(this.pendingFiles[0]);
		}
	}

	handleClickSubmit = () => {
		const { games } = this.state;
		if (games.length === 0) {
			return;
		}
		this.setState({ submitting: true } as IUploadGamesContainerState);
		setTimeout(this.uploadNextGame, 0);
	}

	uploadNextGame = () => {
		const { games } = this.state;
		const { id, when, scores } = games[0];
		updateGame(id, when, scores).then(() => {
			games.splice(0, 1);
			this.setState({
				games: [...games],
				submitting: games.length > 0
			} as IUploadGamesContainerState);
			if (games.length > 0) {
				setTimeout(this.uploadNextGame, 0);
			}
		});
	}

	loadGames = (report: IGameReport) => {
		const newGames = report.reports.map(game => ({
			id: game.gameId,
			when: game.title.match(/Scores for (.+)\./)[1],
			scores: game.playerScores.map(score => ({
				user: score.name,
				score: score.score
			}))
		}));
		const { games } = this.state;
		this.setState({
			games: [...games, ...newGames]
		} as IUploadGamesContainerState);
	}

	render() {
		const { games, pendingFileCount, submitting } = this.state;
		return(
			<UploadGames
				{...{games, pendingFileCount, submitting}}
				onChooseFile={this.handleChooseFile}
				onClickSubmit={this.handleClickSubmit} />
		);
	}
}
