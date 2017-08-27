import * as React from 'react';
import * as moment from 'moment';
import * as styles from './DateDisplay.scss';

interface IDateDisplayProps {
	value: string;
}

export default class DateDisplay extends React.PureComponent<IDateDisplayProps> {
	render() {
		const { value } = this.props;
		const display = moment(value).utc().format('dddd, MMMM Do YYYY');
		return(
			<div className={styles.root}>{display}</div>
		);
	}
}
