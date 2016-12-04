export class AuthenticationService {
	private authenticated: boolean;
	private account: string;

	constructor() {
		this.authenticated = false;
		this.account = null;
	}

	isAuthenticated = () => this.authenticated;
	getAccount = () => this.account;

	setAccount = (account: string) => {
		this.authenticated = true;
		this.account = account;
	}

	logout = () => {
		this.authenticated = false;
		this.account = null;
		localStorage.removeItem('refreshToken');
	}
}

export const authenticationService = new AuthenticationService();
