import * as React from 'react';
import Game from '../components/Game';
import Button from '../components/Button';
import Banner from '../components/Banner';
import { IGame } from '../models';
import * as styles from './UploadGames.scss';

interface IUploadGamesProps {
	games: IGame[];
	pendingFileCount: number;
	submitting: boolean;
	onChooseFile: (file: File) => void;
	onClickSubmit: () => void;
}

export default class UploadGames extends React.PureComponent<IUploadGamesProps, {}> {
	constructor(props: IUploadGamesProps) {
		super(props);
	}

	handleChooseFile = (e: React.FormEvent<HTMLInputElement>) => {
		const { files } = e.currentTarget;
		const { onChooseFile } = this.props;
		for (let index = 0; index < files.length; ++index) {
			onChooseFile(files[index]);
		}
	};

	render() {
		const { games, pendingFileCount, submitting, onClickSubmit } = this.props;
		return(
			<div className={styles.root}>
				<div className={styles.top}>
					<div className={styles.topInner}>
						<h1 className={styles.title}>Upload Games</h1>
						<input
							type='file'
							multiple
							accept='*.json'
							onChange={this.handleChooseFile} />
						<div className={styles.progress}>
							{games.length > 0 && pendingFileCount === 0 && !submitting &&
								<Button type='primary' display='Submit' onClick={onClickSubmit} />
							}
							{submitting &&
								<Banner type='message' display={`Uploading ${games.length} games...`} />
							}
							{pendingFileCount > 0 &&
								<Banner type='message' display={`Parsing ${pendingFileCount} files...`} />
							}
							{games.length === 0 && pendingFileCount === 0 && !submitting &&
								<Banner type='message' display='Select a .json file to upload.' />
							}
						</div>
					</div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.bottomInner}>
						<div className={styles.count}>{games.length} Games</div>
						{games.map((game, i) => (
							<Game key={i} game={game} />
						))}
					</div>
				</div>
			</div>
		);
	}
}
