import * as React from 'react';
import SignInButton from '../components/SignInButton';
import Banner from '../components/Banner';
import * as styles from './Login.scss';

interface ILoginProps {
	signInDisabled: boolean;
	onClickSignIn: () => void;
	statusMessage: string;
	invalidAccount: string;
}

export default class Login extends React.PureComponent<ILoginProps, void> {
	render() {
		const { statusMessage, signInDisabled, invalidAccount, onClickSignIn } = this.props;
		return (
			<div className={styles.root}>
				<h1>Sheepshead Login</h1>
				<p>Please sign in with your directs.com Google account.</p>
				<SignInButton style='dark' disabled={signInDisabled} onClick={onClickSignIn} />
				<div className={styles.banners}>
					{statusMessage &&
						<Banner type='message' display={statusMessage} />
					}
					{invalidAccount &&
						<Banner type='error' display={`${invalidAccount} is not a valid account.  Please contact Jacob Buysse.`} />
					}
				</div>
			</div>
		);
	}
}
