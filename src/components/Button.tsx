import * as React from 'react';
import * as styles from './Button.scss';
import * as cx from 'classnames';

type ButtonType = 'primary' | 'transaction';

interface IButtonProps {
	display: string;
	type: ButtonType;
	onClick: () => void;
}

export default class Button extends React.PureComponent<IButtonProps, {}> {
	render() {
		const { display, type, onClick } = this.props;
		return(
			<button
				className={cx(styles.button, styles[type])}
				onClick={onClick} >
				{display}
			</button>
		);
	}
}
