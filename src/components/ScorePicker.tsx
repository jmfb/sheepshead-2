import * as React from 'react';
import * as styles from './ScorePicker.scss';

interface IScorePickerProps {
	value: number;
	onChange: (value: number) => void;
}

export default class ScorePicker extends React.PureComponent<IScorePickerProps, {}> {
	handleBigDown = () => {
		const { onChange } = this.props;
		onChange(-5);
	}

	handleSmallDown = () => {
		const { onChange } = this.props;
		onChange(-1);
	}

	handleSmallUp = () => {
		const { onChange } = this.props;
		onChange(1);
	}

	handleBigUp = () => {
		const { onChange } = this.props;
		onChange(5);
	}

	render() {
		const { value } = this.props;
		return(
			<div className={styles.root}>
				<span className={styles.container}>
					<button className={styles.button} onClick={this.handleBigDown}>&lt;&lt;</button>
					<button className={styles.button} onClick={this.handleSmallDown}>&lt;</button>
					<span className={styles.value}>{value}</span>
					<button className={styles.button} onClick={this.handleSmallUp}>&gt;</button>
					<button className={styles.button} onClick={this.handleBigUp}>&gt;&gt;</button>
				</span>
			</div>
		);
	}
}
