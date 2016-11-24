import * as React from 'react';
import * as moment from 'moment';
import * as DatePicker from 'react-datepicker';
import * as styles from './DateButton.scss';

require('react-datepicker/dist/react-datepicker.css');

let CustomDateButton = React.createClass({
	displayName: 'CustomDateButton',
	propTypes: {
		onClick: React.PropTypes.func,
		value: React.PropTypes.string
	},
	render() {
		return(
			<button
				className={styles.customInput}
				onClick={this.props.onClick}>
				{moment(this.props.value).utc().format('dddd, MMMM Do YYYY')}
			</button>
		);
	}
});

interface IDateButtonProps {
	value: string;
	onChange: (value: string) => void;
}

export default class DateButton extends React.PureComponent<IDateButtonProps, {}> {
	handleEdit = (date?: moment.Moment) => {
		const { onChange } = this.props;
		onChange(date.utc().format('YYYY-MM-DD'));
	};

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
