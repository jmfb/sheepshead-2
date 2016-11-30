import * as React from 'react';
import * as styles from './FileInput.scss';

interface IFileInputProps extends React.HTMLProps<HTMLInputElement> {
	children?: React.ReactNode;
}

export default class FileInput extends React.PureComponent<IFileInputProps, void> {
	render() {
		const { children, ...props } = this.props;
		return(
			<label className={styles.root}>
				<input
					type='file'
					{...props} />
				{children}
			</label>
		);
	}
}
