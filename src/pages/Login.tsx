import * as React from 'react';
import SignInButton from '~/components/SignInButton';
import Banner from '~/components/Banner';
import * as styles from './Login.scss';

interface ILoginProps {
	signingIn: boolean;
	onClickSignIn: () => void;
}

export default class Login extends React.PureComponent<ILoginProps, void> {
	render() {
		const { signingIn, onClickSignIn } = this.props;
		return (
			<div>
				<main>
					<div>
						<h1>Sheepshead Login</h1>
						<p>Please sign in with any of your Google accounts.</p>
						<p>Contact a site administrator to add your account.</p>
						<SignInButton style='dark' disabled={signingIn} onClick={onClickSignIn} />
						<div className={styles.banners}>
							{signingIn &&
								<Banner type='message' display='Redirecting to sign in page...' />
							}
						</div>
					</div>
				</main>
			</div>
		);
	}
}
