import * as React from 'react';
import Button from '../components/Button';
import * as styles from './Administration.scss';

interface IAdministrationProps {
	onClickAddUser: () => void;
}

export default class Administration extends React.PureComponent<IAdministrationProps, {}> {
	render() {
		const { onClickAddUser } = this.props;
		return(
			<div className={styles.root}>
				<Button type='primary' display='Create User' onClick={onClickAddUser} />
			</div>
		);
	}
}
