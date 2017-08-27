import * as React from 'react';
import * as styles from './TextInput.scss';

interface ITextInputProps {
	label: string;
	value: string;
	placeholder: string;
	maxLength: number;
	autoFocus?: boolean;
	onChange: (value: string) => void;
}

export default class TextInput extends React.PureComponent<ITextInputProps> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { onChange } = this.props;
		onChange(e.currentTarget.value);
	}

	render() {
		const { label, value, placeholder, maxLength, autoFocus } = this.props;
		return (
			<div className={styles.root}>
				<div className={styles.label}>{label}:</div>
				<input
					className={styles.input}
					type='text'
					value={value}
					autoFocus={autoFocus}
					placeholder={placeholder}
					maxLength={maxLength}
					onChange={this.handleChange} />
			</div>
		);
	}
}
