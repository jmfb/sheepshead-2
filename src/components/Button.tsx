import * as React from 'react';
import * as styles from './Button.scss';
import * as cx from 'classnames';

type ButtonType = 'primary' | 'danger';

interface IButtonProps {
	className?: string;
	display: string;
	type: ButtonType;
	onClick: () => void;
}

export default class Button extends React.PureComponent<IButtonProps, {}> {
	render() {
		const { className, display, type, onClick } = this.props;
		return(
			<button
				className={cx(styles.button, styles[type], className)}
				onClick={onClick} >
				{display}
			</button>
		);
	}
}
