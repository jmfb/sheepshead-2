import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './Payout.scss';

interface IPayoutProps {
	name: string;
	score: number;
}

export default class Payout extends React.PureComponent<IPayoutProps> {
	render() {
		const { name, score } = this.props;
		return (
			<div className={styles.root}>
				<div className={cx(styles.score, { [styles.negative]: score < 0 })}>{(Math.abs(score) / 4).toFixed(2)}</div>
				<div className={styles.name}>{name}</div>
			</div>
		);
	}
}
