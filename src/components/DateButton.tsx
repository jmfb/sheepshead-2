import * as React from 'react';
import * as DatePicker from 'react-datepicker';
import * as moment from 'moment';
import * as styles from './DateButton.scss';

import 'react-datepicker/dist/react-datepicker.css';

interface ICustomDateButtonProps {
	value?: string;
	onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

class CustomDateButton extends React.Component<ICustomDateButtonProps, void> {
	render() {
		const { value } = this.props;
		const display = moment(value).utc().format('dddd, MMMM Do YYYY');
		return(
			<button
				className={styles.customInput}
				onClick={this.props.onClick}>
				{display}
			</button>
		);
	}
}

interface IDateButtonProps {
	value: string;
	onChange: (value: string) => void;
}

export default class DateButton extends React.PureComponent<IDateButtonProps, {}> {
	handleEdit = (date?: moment.Moment) => {
		const { onChange } = this.props;
		onChange(date.utc().format('YYYY-MM-DD'));
	}

	render() {
		const { value } = this.props;
		return(
			<DatePicker
				customInput={<CustomDateButton />}
				selected={moment(value)}
				onChange={this.handleEdit} />
		);
	}
}
