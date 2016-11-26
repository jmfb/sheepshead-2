import * as React from 'react';
import * as styles from './PeriodNavigator.scss';

interface IPeriodNavigatorProps {
	period: string;
	onClickPreviousPeriod: () => void;
	onClickNextPeriod: () => void;
}

export default class PeriodNavigator extends React.PureComponent<IPeriodNavigatorProps, {}> {
	render() {
		const { period, onClickPreviousPeriod, onClickNextPeriod } = this.props;
		return(
			<div className={styles.root}>
				<div className={styles.button} onClick={onClickPreviousPeriod}>&lt;</div>
				<div className={styles.period}><span>{period}</span></div>
				<div className={styles.button} onClick={onClickNextPeriod}>&gt;</div>
			</div>
		);
	}
}
