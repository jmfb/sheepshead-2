import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import * as styles from './DateButton.scss';

import 'react-datepicker/dist/react-datepicker.css';

interface ICustomDateButtonProps {
	value?: string;
	onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

class CustomDateButton extends React.Component<ICustomDateButtonProps> {
	render() {
		const { value } = this.props;
		return(
			<button
				className={styles.customInput}
				onClick={this.props.onClick}>
				{value}
			</button>
		);
	}
}

interface IDateButtonProps {
	value: string;
	onChange: (value: string) => void;
}

export default class DateButton extends React.PureComponent<IDateButtonProps> {
	handleEdit = (date?: moment.Moment) => {
		const { onChange } = this.props;
		onChange(date.utc().format('YYYY-MM-DD'));
	}

	render() {
		const { value } = this.props;
		return(
			<DatePicker
				customInput={<CustomDateButton />}
				dateFormat='dddd, MMMM Do YYYY'
				selected={moment(value)}
				onChange={this.handleEdit} />
		);
	}
}
