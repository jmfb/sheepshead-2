import * as React from 'react';
import { IPlayer, IScore } from '../models';
import { sum } from 'lodash';
import * as styles from './PointSpread.scss';

type IScoreOrPlayer = IScore | IPlayer;

interface IPointSpreadProps {
	scores: IScoreOrPlayer[];
}

export default class PointSpread extends React.PureComponent<IPointSpreadProps, void> {
	render() {
		const { scores } = this.props;
		const pointSpread = sum(scores.filter(score => score.score > 0).map(score => score.score));
		return(
			<div className={styles.pointSpread}>P.S. {pointSpread}</div>
		);
	}
}
